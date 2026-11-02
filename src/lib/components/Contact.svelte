<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { contact } from '$lib/content/home';
	import StickerEnvelope from './StickerEnvelope.svelte';
	import Window from './Window.svelte';

	type FormState = {
		sent?: boolean;
		error?: string;
		values?: { name: string; email: string; message: string };
		errors?: Partial<Record<'name' | 'email' | 'message', string>>;
	} | null;

	const form = $derived(page.form as FormState);
	let sending = $state(false);
	const f = contact.form;
</script>

<!-- Toujours en thème sombre, quelle que soit la page : fond photo voilé -->
<section id="contact" class="rv-sec screen contact" data-theme="dark" aria-labelledby="h-contact">
	<div class="head">
		<span class="rv-label dim">{contact.number}</span>
		<h2 id="h-contact" class="title">{contact.title}<StickerEnvelope /></h2>
	</div>

	<div class="grid">
		<div class="links">
			{#each contact.links as l (l.href)}<a href={l.href}>{l.label}</a>{/each}
			<a class="small" href="mailto:{contact.email}">{contact.email}</a>
			<a id="cv" class="small cv" href={contact.cv.href}>{contact.cv.label}</a>
		</div>

		<Window title={f.window}>
			{#if form?.sent}
				<p class="done" role="status">{f.sent}</p>
			{:else}
				<form
					method="POST"
					action="?/contact"
					novalidate
					use:enhance={() => {
						sending = true;
						return async ({ update }) => {
							await update({ reset: false });
							sending = false;
						};
					}}
				>
					<label class="field">
						<span class="rv-label dim">{f.name}</span>
						<input type="text" name="name" autocomplete="name" maxlength="100" required value={form?.values?.name ?? ''} aria-invalid={!!form?.errors?.name} aria-describedby="err-name" />
						{#if form?.errors?.name}<span id="err-name" class="err">{form.errors.name}</span>{/if}
					</label>
					<label class="field">
						<span class="rv-label dim">{f.email}</span>
						<input type="email" name="email" autocomplete="email" maxlength="200" required value={form?.values?.email ?? ''} aria-invalid={!!form?.errors?.email} aria-describedby="err-email" />
						{#if form?.errors?.email}<span id="err-email" class="err">{form.errors.email}</span>{/if}
					</label>
					<label class="field">
						<span class="rv-label dim">{f.message}</span>
						<textarea name="message" rows="3" maxlength="3000" required aria-invalid={!!form?.errors?.message} aria-describedby="err-message">{form?.values?.message ?? ''}</textarea>
						{#if form?.errors?.message}<span id="err-message" class="err">{form.errors.message}</span>{/if}
					</label>
					<!-- Piège à robots : invisible et hors du parcours clavier -->
					<label class="trap" aria-hidden="true">{f.honeypot}<input type="text" name="website" tabindex="-1" autocomplete="off" /></label>
					{#if form?.error}<p class="err" role="alert">{form.error}</p>{/if}
					<div><button class="rv-pill gel" type="submit" disabled={sending}>{sending ? f.sending : f.send} <span aria-hidden="true">↗</span></button></div>
				</form>
			{/if}
		</Window>
	</div>

	<div class="rv-label dim foot">
		<span>{contact.footer.built}</span>
		<span>{contact.footer.copyright}</span>
	</div>
</section>

<style>
	.contact {
		gap: clamp(28px, 4vh, 48px); padding-top: clamp(40px, 8vh, 96px); color: var(--rv-band-ink);
		background:
			linear-gradient(100deg, color-mix(in oklab, var(--rv-band) 90%, transparent) 0%, color-mix(in oklab, var(--rv-band) 74%, transparent) 45%, color-mix(in oklab, var(--rv-band) 55%, transparent) 100%),
			linear-gradient(to bottom, transparent 60%, color-mix(in oklab, var(--rv-band) 85%, transparent) 100%),
			url('/img/chambre.webp') center 40% / cover no-repeat,
			var(--rv-band);
	}
	.dim { opacity: .7; }
	.head { display: flex; flex-direction: column; gap: 14px; }
	.title { margin: 0; font-size: clamp(48px, min(7.6vw, 12vh), 110px); line-height: .88; letter-spacing: var(--rv-track-hero); font-weight: 900; }
	.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(360px, 100%), 1fr)); gap: 48px; align-items: start; }
	.links { display: flex; flex-direction: column; gap: 14px; font-size: 22px; font-weight: 600; }
	.links .small { font-size: 17px; font-weight: 500; overflow-wrap: anywhere; }
	.links .cv { color: var(--rv-turq-ink); }
	.links a:hover { color: var(--rv-turq-ink); }
	form { display: flex; flex-direction: column; gap: clamp(12px, 2.2vh, 22px); padding: clamp(18px, 2.6vh, 26px) 26px; }
	.field { display: flex; flex-direction: column; gap: 8px; }
	.field input, .field textarea {
		padding: 10px 0; border: 0; border-bottom: var(--rv-line-w) solid var(--rv-ink);
		background: transparent; color: var(--rv-ink); font: inherit; font-size: 17px; outline: none; resize: vertical;
	}
	.field input:focus, .field textarea:focus { border-bottom-color: var(--rv-turq-ink); }
	.field [aria-invalid='true'] { border-bottom-color: var(--rv-danger-ink); }
	.err { margin: 0; font-size: 14px; color: var(--rv-danger-ink); }
	.trap { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
	.done { margin: 0; padding: 26px; font-size: 19px; line-height: 1.5; color: var(--rv-turq-ink); }
	button:disabled { opacity: .6; cursor: progress; }
	.foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; padding-top: 24px; border-top: var(--rv-line-w) solid var(--rv-band-line); }
</style>
