/** « il y a 2 h », « il y a 3 j »… (style court, en français). */
const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto', style: 'short' });

export function sinceText(fromIso: string, now: Date): string {
	const s = Math.max(0, (now.getTime() - new Date(fromIso).getTime()) / 1000);
	if (s < 3600) return rtf.format(-Math.max(1, Math.round(s / 60)), 'minute');
	if (s < 86_400) return rtf.format(-Math.round(s / 3600), 'hour');
	return rtf.format(-Math.round(s / 86_400), 'day');
}
