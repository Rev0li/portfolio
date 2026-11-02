import { describe, expect, it, vi } from 'vitest';
import { createRateLimiter, formatTelegram, isBot, LIMITS, sendTelegram, validateContact } from './contact';

const ok = { name: 'Ada', email: 'ada@example.com', message: 'Bonjour, parlons DevOps !' };

describe('validateContact', () => {
	it('accepte un message correct et retire les espaces', () => {
		const { data, errors } = validateContact({ ...ok, name: '  Ada  ' });
		expect(errors).toEqual({});
		expect(data.name).toBe('Ada');
	});
	it('refuse les champs vides ou absents', () => {
		const { errors } = validateContact({});
		expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name']);
	});
	it('refuse un e-mail invalide', () => {
		expect(validateContact({ ...ok, email: 'pas-un-mail' }).errors.email).toBeDefined();
	});
	it('applique les tailles max', () => {
		expect(validateContact({ ...ok, name: 'a'.repeat(LIMITS.name + 1) }).errors.name).toBeDefined();
		expect(validateContact({ ...ok, message: 'a'.repeat(LIMITS.messageMax + 1) }).errors.message).toBeDefined();
		expect(validateContact({ ...ok, message: 'court' }).errors.message).toBeDefined();
	});
	it('ignore les valeurs qui ne sont pas du texte', () => {
		expect(validateContact({ ...ok, name: 42 }).errors.name).toBeDefined();
	});
});

describe('isBot', () => {
	it('repère le champ piège rempli', () => {
		expect(isBot({ website: 'http://spam' })).toBe(true);
		expect(isBot({ website: '' })).toBe(false);
		expect(isBot({})).toBe(false);
	});
});

describe('createRateLimiter', () => {
	it('bloque au-delà du max par adresse, puis libère après la fenêtre', () => {
		let t = 0;
		const allow = createRateLimiter({ max: 2, windowMs: 1000, globalMax: 100, now: () => t });
		expect(allow('a')).toBe(true);
		expect(allow('a')).toBe(true);
		expect(allow('a')).toBe(false);
		expect(allow('b')).toBe(true);
		t = 1001;
		expect(allow('a')).toBe(true);
	});
	it('applique le plafond global', () => {
		const allow = createRateLimiter({ max: 5, windowMs: 1000, globalMax: 2, now: () => 0 });
		expect(allow('a')).toBe(true);
		expect(allow('b')).toBe(true);
		expect(allow('c')).toBe(false);
	});
});

describe('Telegram', () => {
	it('formate en texte brut', () => {
		expect(formatTelegram(ok)).toBe('📬 Portfolio — nouveau message\nDe : Ada <ada@example.com>\n\nBonjour, parlons DevOps !');
	});
	it("n'appelle rien si non configuré", async () => {
		const f = vi.fn();
		expect(await sendTelegram({}, ok, f)).toBe(false);
		expect(f).not.toHaveBeenCalled();
	});
	it("appelle l'API avec le chat et le texte", async () => {
		const f = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
		expect(await sendTelegram({ token: 'T', chatId: '42' }, ok, f)).toBe(true);
		const [url, init] = f.mock.calls[0];
		expect(url).toBe('https://api.telegram.org/botT/sendMessage');
		expect(JSON.parse(init.body)).toMatchObject({ chat_id: '42', text: formatTelegram(ok) });
	});
	it('renvoie false si Telegram refuse ou si le réseau tombe', async () => {
		expect(await sendTelegram({ token: 'T', chatId: '42' }, ok, vi.fn().mockResolvedValue(new Response('', { status: 401 })))).toBe(false);
		expect(await sendTelegram({ token: 'T', chatId: '42' }, ok, vi.fn().mockRejectedValue(new Error('down')))).toBe(false);
	});
});
