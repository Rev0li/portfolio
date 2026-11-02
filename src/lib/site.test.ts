import { describe, expect, it } from 'vitest';
import { pageTitle, site } from './site';

describe('pageTitle', () => {
	it('renvoie le titre du site sans page', () => {
		expect(pageTitle()).toBe(site.title);
	});
	it('préfixe le nom de la page', () => {
		expect(pageTitle('CI/CD')).toBe(`CI/CD · ${site.title}`);
	});
});
