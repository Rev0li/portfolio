/**
 * Données du bandeau live : uniquement des faits vérifiables, agrégés.
 * Sortie publique = noms de services + booléens + nombres. Jamais d'URL,
 * d'IP, de nom d'hôte ni de port (les cibles restent côté serveur, dans .env).
 */

export type Service = { name: string; url: string };
export type LiveData = {
	services: { name: string; up: boolean }[];
	latencyMs: number | null;
	deployedAt: string;
	commitsWeek: number | null;
};

/** LIVE_SERVICES="rev0auth=https://…,SongSurf=https://…" → liste de cibles (https seulement). */
export function parseServices(raw: string | undefined): Service[] {
	if (!raw) return [];
	return raw
		.split(',')
		.map((pair) => pair.split('=').map((s) => s.trim()))
		.filter(([name, url]) => name && url?.startsWith('https://'))
		.map(([name, url]) => ({ name, url }));
}

/**
 * Un service est « en ligne » s'il répond sans erreur serveur (< 500) en moins de 4 s.
 * Un 401/302 compte comme en ligne : le service répond, il demande juste une connexion.
 */
export async function probe(url: string, fetchFn: typeof fetch = fetch, now: () => number = performance.now.bind(performance)) {
	const t0 = now();
	try {
		const res = await fetchFn(url, { method: 'GET', redirect: 'manual', signal: AbortSignal.timeout(4000) });
		await res.body?.cancel();
		return { up: res.status < 500, ms: Math.round(now() - t0) };
	} catch {
		return { up: false, ms: null };
	}
}

/** Commits publics de la semaine (API de recherche GitHub, sans jeton). */
export async function commitsThisWeek(user: string, today: Date, fetchFn: typeof fetch = fetch): Promise<number | null> {
	const since = new Date(today.getTime() - 7 * 86_400_000).toISOString().slice(0, 10);
	try {
		const res = await fetchFn(
			`https://api.github.com/search/commits?q=author:${encodeURIComponent(user)}+committer-date:>=${since}&per_page=1`,
			{ headers: { accept: 'application/vnd.github+json', 'user-agent': 'portfolio-rev0li' }, signal: AbortSignal.timeout(5000) }
		);
		if (!res.ok) return null;
		const data = (await res.json()) as { total_count?: unknown };
		return typeof data.total_count === 'number' ? data.total_count : null;
	} catch {
		return null;
	}
}

/**
 * Cache en mémoire : une seule mesure à la fois, réutilisée pendant `ttlMs`.
 * Un visiteur ne peut donc pas déclencher des rafales de requêtes vers les services.
 */
export function cached<T>(ttlMs: number, load: () => Promise<T>, now: () => number = Date.now) {
	let value: { at: number; data: T } | null = null;
	let pending: Promise<T> | null = null;
	return async (): Promise<T> => {
		if (value && now() - value.at < ttlMs) return value.data;
		pending ??= load()
			.then((data) => {
				value = { at: now(), data };
				return data;
			})
			.finally(() => (pending = null));
		return pending;
	};
}

export async function collectServices(services: Service[], fetchFn: typeof fetch = fetch) {
	const results = await Promise.all(services.map((s) => probe(s.url, fetchFn)));
	const times = results.map((r) => r.ms).filter((ms): ms is number => ms !== null);
	return {
		services: services.map((s, i) => ({ name: s.name, up: results[i].up })),
		latencyMs: times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : null
	};
}
