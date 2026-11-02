import { describe, expect, it, vi } from 'vitest';
import { cached, collectServices, commitsThisWeek, parseServices, probe } from './live';

const res = (status: number) => new Response(null, { status });

describe('parseServices', () => {
	it('lit la liste nom=url et ignore le reste', () => {
		expect(parseServices('rev0auth=https://a.example, SongSurf = https://b.example ,bad,ftp=ftp://x,=https://y')).toEqual([
			{ name: 'rev0auth', url: 'https://a.example' },
			{ name: 'SongSurf', url: 'https://b.example' }
		]);
		expect(parseServices(undefined)).toEqual([]);
	});
});

describe('probe', () => {
	it('en ligne si < 500, même 401 ou 302', async () => {
		for (const s of [200, 302, 401]) expect((await probe('https://x', vi.fn().mockResolvedValue(res(s)))).up).toBe(true);
	});
	it('hors ligne sur 5xx ou erreur réseau', async () => {
		expect((await probe('https://x', vi.fn().mockResolvedValue(res(502)))).up).toBe(false);
		expect(await probe('https://x', vi.fn().mockRejectedValue(new Error('timeout')))).toEqual({ up: false, ms: null });
	});
	it('mesure le temps de réponse', async () => {
		let t = 100;
		const r = await probe('https://x', vi.fn().mockImplementation(async () => ((t = 250), res(200))), () => t);
		expect(r.ms).toBe(150);
	});
});

describe('collectServices', () => {
	it('ne renvoie que noms et booléens, et la moyenne des temps', async () => {
		const f = vi.fn().mockResolvedValueOnce(res(200)).mockResolvedValueOnce(res(503));
		const out = await collectServices([{ name: 'A', url: 'https://a' }, { name: 'B', url: 'https://b' }], f);
		expect(out.services).toEqual([{ name: 'A', up: true }, { name: 'B', up: false }]);
		expect(JSON.stringify(out)).not.toContain('https://');
		expect(typeof out.latencyMs).toBe('number');
	});
	it('pas de temps de réponse si rien ne répond', async () => {
		const out = await collectServices([{ name: 'A', url: 'https://a' }], vi.fn().mockRejectedValue(new Error()));
		expect(out.latencyMs).toBeNull();
	});
});

describe('commitsThisWeek', () => {
	it('lit total_count sur les 7 derniers jours', async () => {
		const f = vi.fn().mockResolvedValue(new Response(JSON.stringify({ total_count: 97 })));
		expect(await commitsThisWeek('Rev0li', new Date('2026-11-02T12:00:00Z'), f)).toBe(97);
		expect(f.mock.calls[0][0]).toContain('committer-date:>=2026-10-26');
	});
	it('null si GitHub refuse ou ne répond pas', async () => {
		expect(await commitsThisWeek('Rev0li', new Date(), vi.fn().mockResolvedValue(res(403)))).toBeNull();
		expect(await commitsThisWeek('Rev0li', new Date(), vi.fn().mockRejectedValue(new Error()))).toBeNull();
	});
});

describe('cached', () => {
	it('une seule mesure pendant la durée de vie, même en rafale', async () => {
		let t = 0;
		const load = vi.fn().mockResolvedValue(1);
		const get = cached(1000, load, () => t);
		await Promise.all([get(), get(), get()]);
		await get();
		expect(load).toHaveBeenCalledTimes(1);
		t = 1001;
		await get();
		expect(load).toHaveBeenCalledTimes(2);
	});
});
