/** Formulaire de contact : validation, anti-spam et envoi vers Telegram. */

export const LIMITS = { name: 100, email: 200, messageMin: 10, messageMax: 3000 } as const;

export type ContactInput = { name: string; email: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Nettoie et valide les champs ; renvoie les erreurs par champ (vide = valide). */
export function validateContact(raw: Record<string, unknown>): { data: ContactInput; errors: ContactErrors } {
	const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
	const data = { name: str(raw.name), email: str(raw.email), message: str(raw.message) };
	const errors: ContactErrors = {};
	if (!data.name) errors.name = 'Indiquez votre nom.';
	else if (data.name.length > LIMITS.name) errors.name = `${LIMITS.name} caractères maximum.`;
	if (!data.email) errors.email = 'Indiquez votre adresse e-mail.';
	else if (!EMAIL.test(data.email) || data.email.length > LIMITS.email) errors.email = 'Adresse incomplète (ex. nom@entreprise.fr).';
	if (!data.message) errors.message = 'Un petit mot avant d’envoyer ?';
	else if (data.message.length < LIMITS.messageMin) errors.message = `Au moins ${LIMITS.messageMin} caractères.`;
	else if (data.message.length > LIMITS.messageMax) errors.message = `${LIMITS.messageMax} caractères maximum.`;
	return { data, errors };
}

/** Le champ piège est invisible pour un humain : rempli = robot. */
export function isBot(raw: Record<string, unknown>): boolean {
	return typeof raw.website === 'string' && raw.website.trim() !== '';
}

/**
 * Limiteur en mémoire : `max` envois par clé (adresse IP) sur `windowMs`,
 * plus un plafond global pour encaisser un robot qui change d'adresse.
 * Suffisant pour un seul conteneur ; remis à zéro au redémarrage.
 */
export function createRateLimiter(opts: { max: number; windowMs: number; globalMax: number; now?: () => number }) {
	const now = opts.now ?? Date.now;
	const hits = new Map<string, number[]>();
	let global: number[] = [];
	return (key: string): boolean => {
		const t = now();
		const keep = (ts: number[]) => ts.filter((x) => t - x < opts.windowMs);
		global = keep(global);
		const mine = keep(hits.get(key) ?? []);
		if (mine.length >= opts.max || global.length >= opts.globalMax) {
			hits.set(key, mine);
			return false;
		}
		mine.push(t);
		global.push(t);
		hits.set(key, mine);
		// ménage : on ne garde pas d'adresses sans envoi récent
		if (hits.size > 1000) for (const [k, v] of hits) if (!keep(v).length) hits.delete(k);
		return true;
	};
}

/** Texte brut (pas de mise en forme Telegram : rien à injecter). */
export function formatTelegram({ name, email, message }: ContactInput): string {
	return `📬 Portfolio — nouveau message\nDe : ${name} <${email}>\n\n${message}`;
}

export type TelegramConfig = { token?: string; chatId?: string };

/** Envoie le message ; renvoie false si non configuré ou si Telegram refuse. */
export async function sendTelegram(
	cfg: TelegramConfig,
	input: ContactInput,
	fetchFn: typeof fetch = fetch
): Promise<boolean> {
	if (!cfg.token || !cfg.chatId) return false;
	try {
		const res = await fetchFn(`https://api.telegram.org/bot${cfg.token}/sendMessage`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ chat_id: cfg.chatId, text: formatTelegram(input), disable_web_page_preview: true }),
			signal: AbortSignal.timeout(8000)
		});
		return res.ok;
	} catch {
		return false;
	}
}
