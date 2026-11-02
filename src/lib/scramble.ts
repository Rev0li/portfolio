/** Effet « scramble » : le texte se révèle de gauche à droite derrière des glyphes. */
export const GLYPHS = '01#%&*+=/<>[]';

/**
 * Image n° `frame` sur `total` : les caractères déjà révélés, puis des glyphes.
 * Espaces et retours à la ligne restent en place pour que la mise en page ne saute pas.
 */
export function scrambleFrame(target: string, frame: number, total: number, rand: () => number = Math.random): string {
	if (frame >= total) return target;
	const done = Math.floor((frame / total) * target.length);
	let out = '';
	for (let i = 0; i < target.length; i++) {
		const c = target[i];
		out += i < done || c === '\n' || c === ' ' ? c : GLYPHS[Math.floor(rand() * GLYPHS.length)];
	}
	return out;
}
