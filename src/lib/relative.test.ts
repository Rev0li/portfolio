import { describe, expect, it } from 'vitest';
import { sinceText } from './relative';

const now = new Date('2026-11-02T12:00:00Z');
const ago = (s: number) => new Date(now.getTime() - s * 1000).toISOString();

describe('sinceText', () => {
	it('minutes, heures, jours', () => {
		expect(sinceText(ago(20), now)).toMatch(/1\s?min/);
		expect(sinceText(ago(45 * 60), now)).toMatch(/45\s?min/);
		expect(sinceText(ago(2 * 3600), now)).toMatch(/2\s?h/);
		expect(sinceText(ago(3 * 86_400), now)).toMatch(/3\s?j/);
	});
	it('jamais dans le futur', () => {
		expect(sinceText(ago(-500), now)).toMatch(/1\s?min/);
	});
});
