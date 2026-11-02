/** Heure de Lyon (HH:MM), quel que soit le fuseau du visiteur. */
const lyon = new Intl.DateTimeFormat('fr-FR', {
	timeZone: 'Europe/Paris',
	hour: '2-digit',
	minute: '2-digit'
});

export function lyonTime(date: Date): string {
	return lyon.format(date);
}
