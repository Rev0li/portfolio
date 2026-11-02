import { describe, expect, it } from 'vitest';
import { effectiveTheme, parseTheme, toggleTheme } from './theme';

describe('thème', () => {
	it('ne garde que les valeurs connues', () => {
		expect(parseTheme('dark')).toBe('dark');
		expect(parseTheme('light')).toBe('light');
		expect(parseTheme('sepia')).toBeNull();
		expect(parseTheme(null)).toBeNull();
		expect(parseTheme(undefined)).toBeNull();
	});
	it('le choix du visiteur passe avant le système', () => {
		expect(effectiveTheme('light', true)).toBe('light');
		expect(effectiveTheme('dark', false)).toBe('dark');
	});
	it('sans choix, suit le système', () => {
		expect(effectiveTheme(null, true)).toBe('dark');
		expect(effectiveTheme(null, false)).toBe('light');
	});
	it('bascule', () => {
		expect(toggleTheme('dark')).toBe('light');
		expect(toggleTheme('light')).toBe('dark');
	});
});
