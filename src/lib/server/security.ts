/** En-têtes de sécurité posés sur chaque réponse (repris de l'ancien serveur Rust). */
export const securityHeaders: Record<string, string> = {
	'x-content-type-options': 'nosniff',
	'x-frame-options': 'DENY',
	'referrer-policy': 'strict-origin-when-cross-origin'
};

/** Ajoute les en-têtes absents, sans écraser ceux déjà fixés par une route. */
export function applySecurityHeaders(headers: Headers): void {
	for (const [name, value] of Object.entries(securityHeaders)) {
		if (!headers.has(name)) headers.set(name, value);
	}
}
