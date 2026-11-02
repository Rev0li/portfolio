import { describe, expect, it } from 'vitest';
import { lyonTime } from './clock';

describe('lyonTime', () => {
	it("donne l'heure de Paris en hiver (UTC+1)", () => {
		expect(lyonTime(new Date('2026-01-15T08:05:00Z'))).toBe('09:05');
	});
	it("donne l'heure de Paris en été (UTC+2)", () => {
		expect(lyonTime(new Date('2026-07-15T21:30:00Z'))).toBe('23:30');
	});
});
