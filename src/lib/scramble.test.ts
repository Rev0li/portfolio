import { describe, expect, it } from 'vitest';
import { GLYPHS, scrambleFrame } from './scramble';

const target = 'Ingénieur\nDevOps & IA';

describe('scrambleFrame', () => {
	it('rend le texte final à la dernière image', () => {
		expect(scrambleFrame(target, 28, 28)).toBe(target);
	});
	it('garde la longueur, les espaces et les retours à la ligne', () => {
		const f = scrambleFrame(target, 5, 28);
		expect(f).toHaveLength(target.length);
		expect(f.indexOf('\n')).toBe(target.indexOf('\n'));
		expect(f[target.indexOf(' ')]).toBe(' ');
	});
	it('révèle le début et brouille la fin', () => {
		const f = scrambleFrame(target, 14, 28, () => 0);
		const done = Math.floor((14 / 28) * target.length);
		expect(f.slice(0, done)).toBe(target.slice(0, done));
		expect(f[target.length - 1]).toBe(GLYPHS[0]);
	});
});
