/** Thème clair/sombre : choix du visiteur gardé dans localStorage, sinon préférence système. */
export type Theme = 'light' | 'dark';

export const THEME_KEY = 'rv-theme';

/** Lit une valeur stockée ; tout ce qui n'est pas un thème connu vaut « pas de choix ». */
export function parseTheme(value: string | null | undefined): Theme | null {
	return value === 'light' || value === 'dark' ? value : null;
}

/** Thème réellement affiché : le choix du visiteur, sinon celui du système. */
export function effectiveTheme(stored: Theme | null, prefersDark: boolean): Theme {
	return stored ?? (prefersDark ? 'dark' : 'light');
}

export function toggleTheme(theme: Theme): Theme {
	return theme === 'dark' ? 'light' : 'dark';
}

/** Côté navigateur seulement : thème affiché en ce moment. */
export function readTheme(): Theme {
	const fromAttr = parseTheme(document.documentElement.dataset.theme);
	return effectiveTheme(fromAttr, matchMedia('(prefers-color-scheme: dark)').matches);
}

/** Côté navigateur seulement : applique et mémorise le thème. */
export function applyTheme(theme: Theme): void {
	document.documentElement.dataset.theme = theme;
	try {
		localStorage.setItem(THEME_KEY, theme);
	} catch {
		// stockage bloqué (navigation privée stricte) : le thème vaut pour la page en cours
	}
}
