/** Données de base du site, partagées par les pages. */
export const site = {
	name: 'Olivier Kientzler',
	title: 'Portfolio — rev0li',
	github: 'https://github.com/Rev0li'
} as const;

/** Titre d'onglet : « Page · Portfolio — rev0li », ou le titre seul. */
export function pageTitle(page?: string): string {
	return page ? `${page} · ${site.title}` : site.title;
}
