import { describe, expect, it } from 'vitest';
import { applySecurityHeaders, securityHeaders } from './security';

describe('applySecurityHeaders', () => {
	it('pose tous les en-têtes de sécurité', () => {
		const h = new Headers();
		applySecurityHeaders(h);
		for (const [name, value] of Object.entries(securityHeaders)) expect(h.get(name)).toBe(value);
	});
	it("n'écrase pas un en-tête déjà fixé", () => {
		const h = new Headers({ 'x-frame-options': 'SAMEORIGIN' });
		applySecurityHeaders(h);
		expect(h.get('x-frame-options')).toBe('SAMEORIGIN');
	});
});
