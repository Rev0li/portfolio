import { describe, expect, it } from 'vitest';
import { isAiming } from './aim';

const win = { left: 800, top: 200, bottom: 600 };

describe('isAiming', () => {
	it('faux avec un seul point', () => {
		expect(isAiming([{ x: 100, y: 300 }], win)).toBe(false);
	});
	it('vrai en diagonale vers la fenêtre', () => {
		expect(isAiming([{ x: 400, y: 300 }, { x: 500, y: 320 }], win)).toBe(true);
	});
	it('faux si la souris recule vers la gauche', () => {
		expect(isAiming([{ x: 500, y: 300 }, { x: 450, y: 310 }], win)).toBe(false);
	});
	it('faux si la souris part hors du triangle (trop bas)', () => {
		expect(isAiming([{ x: 400, y: 300 }, { x: 420, y: 700 }], win)).toBe(false);
	});
	it('faux une fois la fenêtre atteinte', () => {
		expect(isAiming([{ x: 700, y: 300 }, { x: 820, y: 310 }], win)).toBe(false);
	});
});
