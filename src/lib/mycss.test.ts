import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { asset, ico, MYCSS_VERSION } from './mycss';
import { peek, stack } from './content/home';
import { domainIcons, toolColors, toolKey } from './content/icons';

describe('MyCss', () => {
	it('app.html charge la même version que $lib/mycss', () => {
		const html = readFileSync('src/app.html', 'utf8');
		const versions = [...html.matchAll(/MyCss@(v[\d.]+)/g)].map((m) => m[1]);
		expect(versions.length).toBeGreaterThan(0);
		expect(new Set(versions)).toEqual(new Set([MYCSS_VERSION]));
	});
	it('construit des adresses absolues (obligatoire pour --ico)', () => {
		expect(asset('stickers/onigiri.svg')).toMatch(/^https:\/\/cdn\.jsdelivr\.net\/gh\/Rev0li\/MyCss@v[\d.]+\/assets\/stickers\/onigiri\.svg$/);
		expect(ico('tools', 'docker')).toMatch(/^url\('https:\/\/.+\/assets\/icons\/tools\/docker\.svg'\)$/);
	});
});

describe('icônes de la stack', () => {
	it('toutes les clés utilisées existent dans MyCss', () => {
		const used = [...peek.map(([, key]) => key), ...stack.flatMap(([, tools]) => tools.map(([, , key]) => key))];
		expect(used.filter((key) => !(key in toolColors))).toEqual([]);
	});
	it('une clé inconnue retombe sur spark', () => {
		expect(toolKey('inconnu')).toBe('spark');
		expect(toolKey('docker')).toBe('docker');
	});
	it('un picto par domaine', () => {
		expect(domainIcons).toHaveLength(stack.length);
	});
});
