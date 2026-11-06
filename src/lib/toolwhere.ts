/**
 * Découpe le « où je l'utilise » d'un outil pour la stack mobile :
 * une étiquette courte (« Stage », « Perso · 42 »…) et la phrase de détail, s'il en reste une.
 *   'Stage — charts de déploiement.'  → { tag: 'Stage', detail: 'Charts de déploiement.' }
 *   '42 et perso.'                    → { tag: '42 · Perso', detail: '' }
 */
const PLACES: Record<string, string> = {
	stage: 'Stage',
	perso: 'Perso',
	'42': '42',
	partout: 'Partout',
	formation: 'Formation',
	quotidien: 'Au quotidien'
};

export function splitWhere(where: string): { tag: string; detail: string } {
	const dash = where.indexOf(' — ');
	const head = dash >= 0 ? where.slice(0, dash) : where;
	const words = head.replace(/[.,]/g, ' ').split(/\s+/).filter(Boolean);
	const found = words.map((w) => PLACES[w.toLowerCase()]).filter((t): t is string => !!t);
	const tag = [...new Set(found)].slice(0, 2).join(' · ');

	if (dash >= 0) {
		const rest = where.slice(dash + 3).trim();
		return { tag, detail: rest.charAt(0).toUpperCase() + rest.slice(1) };
	}
	// Sans tiret : la phrase entière sert de détail, sauf si l'étiquette dit déjà tout
	const covered = words.every((w) => w.toLowerCase() === 'et' || PLACES[w.toLowerCase()]);
	return { tag, detail: covered ? '' : where };
}
