/**
 * Triangle de sécurité (« menu aim ») : quand la souris file en diagonale de la
 * liste vers la fenêtre de démo, les lignes traversées ne changent pas la sélection.
 */
export type Point = { x: number; y: number };
export type Box = { left: number; top: number; bottom: number };

/** Marge verticale autour de la fenêtre (px). */
export const AIM_MARGIN = 20;

/**
 * La souris vise-t-elle la fenêtre ? Vrai si le dernier point est dans le triangle
 * (premier point récent, coin haut-gauche, coin bas-gauche de la fenêtre) et que
 * la souris avance vers la droite sans l'avoir encore atteinte.
 */
export function isAiming(pts: readonly Point[], win: Box): boolean {
	if (pts.length < 2) return false;
	const a = pts[0];
	const c = pts[pts.length - 1];
	if (win.left <= c.x || c.x <= a.x) return false;
	const top = { x: win.left, y: win.top - AIM_MARGIN };
	const bot = { x: win.left, y: win.bottom + AIM_MARGIN };
	const side = (p: Point, q: Point, m: Point) => (q.x - p.x) * (m.y - p.y) - (q.y - p.y) * (m.x - p.x);
	const d1 = side(a, top, c);
	const d2 = side(top, bot, c);
	const d3 = side(bot, a, c);
	const neg = d1 < 0 || d2 < 0 || d3 < 0;
	const pos = d1 > 0 || d2 > 0 || d3 > 0;
	return !(neg && pos);
}
