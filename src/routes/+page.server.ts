import { fail, type Actions } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { createRateLimiter, isBot, sendTelegram, validateContact } from '$lib/server/contact';
import { contact } from '$lib/content/home';

// 3 messages par adresse IP toutes les 10 minutes, 30 par heure au total.
const allowPerIp = createRateLimiter({ max: 3, windowMs: 10 * 60_000, globalMax: 30 });

export const actions: Actions = {
	contact: async ({ request, getClientAddress }) => {
		const raw = Object.fromEntries(await request.formData());
		// Robot : on fait comme si tout allait bien, sans rien envoyer.
		if (isBot(raw)) return { sent: true };

		const { data, errors } = validateContact(raw);
		if (Object.keys(errors).length) return fail(400, { values: data, errors });

		if (!allowPerIp(getClientAddress())) return fail(429, { values: data, error: contact.form.tooMany });

		const sent = await sendTelegram({ token: env.TELEGRAM_BOT_TOKEN, chatId: env.TELEGRAM_CHAT_ID }, data);
		if (!sent) return fail(503, { values: data, error: contact.form.unavailable });
		return { sent: true };
	}
};
