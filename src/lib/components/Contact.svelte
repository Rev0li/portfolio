<script lang="ts">
	import type { FullAutoFill } from 'svelte/elements';
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { contact } from '$lib/content/home';
	import StickerEnvelope from './StickerEnvelope.svelte';
	import Window from './Window.svelte';

	type Field = 'name' | 'email' | 'message';
	type FormState = {
		sent?: boolean;
		name?: string;
		error?: string;
		values?: Record<Field, string>;
		errors?: Partial<Record<Field, string>>;
	} | null;

	const form = $derived(page.form as FormState);
	let sending = $state(false);
	let writeAgain = $state(false); // « Écrire un autre message » après un envoi réussi
	const done = $derived(!!form?.sent && !writeAgain);
	const merr = $derived(writeAgain ? undefined : form?.errors?.message);
	const f = contact.form;
	const fields: { key: Field; type: string; auto: FullAutoFill; max: number }[] = [
		{ key: 'name', type: 'text', auto: 'name', max: 100 },
		{ key: 'email', type: 'email', auto: 'email', max: 200 }
	];
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

		<Window title={done ? f.windowSent : f.window}>
			{#if done}
				<div class="done" role="status">
					<StickerEnvelope />
					<b class="done-title">{f.sentTitle}</b>
					<p class="done-text">{f.sentText(form?.name ?? '')}</p>
					<button type="button" class="rv-ulink again" onclick={() => (writeAgain = true)}>{f.again}</button>
				</div>
			{:else}
				<form
					method="POST"
					action="?/contact"
					novalidate
					aria-busy={sending}
					use:enhance={() => {
						sending = true;
						return async ({ update }) => {
							await update({ reset: false });
							sending = false;
							writeAgain = false;
						};
					}}
				>
					{#if form?.error}
						<p class="alert" role="alert"><span class="rv-mono" aria-hidden="true">[ ! ]</span><span>{form.error} <b>{contact.email}</b>.</span></p>
					{/if}
					<fieldset disabled={sending}>
						{#each fields as fl (fl.key)}
							{@const err = writeAgain ? undefined : form?.errors?.[fl.key]}
							<label class="field" class:err>
								<span class="rv-label">{f[fl.key]}</span>
								<input type={fl.type} name={fl.key} autocomplete={fl.auto} maxlength={fl.max} required placeholder={f.placeholders[fl.key]} value={writeAgain ? '' : (form?.values?.[fl.key] ?? '')} aria-invalid={!!err} aria-describedby={err ? `err-${fl.key}` : undefined} />
								{#if err}<span id="err-{fl.key}" class="msg-err">[ ! ] {err}</span>{/if}
							</label>
						{/each}
						<label class="field" class:err={merr}>
							<span class="rv-label">{f.message}</span>
							<textarea name="message" rows="3" maxlength="3000" required placeholder={f.placeholders.message} aria-invalid={!!merr} aria-describedby={merr ? 'err-message' : undefined}>{writeAgain ? '' : (form?.values?.message ?? '')}</textarea>
							{#if merr}<span id="err-message" class="msg-err">[ ! ] {merr}</span>{/if}
						</label>
					</fieldset>
					<!-- Piège à robots : invisible et hors du parcours clavier -->
					<label class="trap" aria-hidden="true">{f.honeypot}<input type="text" name="website" tabindex="-1" autocomplete="off" /></label>
					<div>
						<button class="rv-pill gel" type="submit" disabled={sending}>
							{#if sending}<span class="loader" aria-hidden="true"><i></i><i></i><i></i></span> {f.sending}
							{:else if form?.error}{f.retry} <span aria-hidden="true">↻</span>
							{:else}{f.send} <span aria-hidden="true">↗</span>{/if}
						</button>
					</div>
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
	fieldset { display: contents; }
	.field { display: flex; flex-direction: column; gap: 8px; }
	.field .rv-label { opacity: .7; transition: color var(--rv-dur) var(--rv-ease), opacity var(--rv-dur) var(--rv-ease); }
	.field input, .field textarea {
		padding: 10px 0; border: 0; border-bottom: var(--rv-line-w) solid var(--rv-ink);
		background: transparent; color: var(--rv-ink); font: inherit; font-size: 17px; outline: none; resize: vertical;
	}
	.field input::placeholder, .field textarea::placeholder { color: color-mix(in oklab, var(--rv-ink) 45%, transparent); }
	/* Champ actif : étiquette et trait turquoise (2 px) */
	.field:focus-within .rv-label { opacity: 1; color: var(--rv-turq-ink); }
	.field:focus-within input, .field:focus-within textarea { border-bottom: 2px solid var(--rv-turq-ink); padding-bottom: 9px; }
	/* Erreur : texte + trait rose, jamais la couleur seule */
	.field.err .rv-label { opacity: 1; color: var(--rv-rose-ink); }
	.field.err input, .field.err textarea { border-bottom: 2px solid var(--rv-rose-ink); padding-bottom: 9px; }
	.msg-err { font-family: var(--rv-font-mono); font-size: 12px; color: var(--rv-rose-ink); }
	fieldset:disabled .field { opacity: .5; }
	.alert {
		display: flex; gap: 10px; align-items: flex-start; margin: 0; padding: 12px 14px;
		border: var(--rv-line-w) solid var(--rv-rose-ink); border-radius: var(--rv-radius-sm);
		font-size: 14px; line-height: 1.4; color: var(--rv-rose-ink);
	}
	.alert b { overflow-wrap: anywhere; }
	.loader { display: inline-flex; gap: 4px; }
	.loader i { width: 6px; height: 6px; background: currentColor; animation: blink 1s steps(2, end) infinite; }
	.loader i:nth-child(2) { animation-delay: .2s; }
	.loader i:nth-child(3) { animation-delay: .4s; }
	@keyframes blink { 50% { opacity: .2; } }

	.done { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 16px; padding: 32px 24px; min-height: 300px; box-sizing: border-box; }
	.done :global(.rv-sticker) { width: 72px; height: 72px; margin: 0; }
	.done-title { font-size: 32px; letter-spacing: -.03em; line-height: 1.05; }
	.done-text { margin: 0; font-size: 17px; line-height: 1.45; opacity: .8; }
	.again { padding: 0; border: 0; background: none; color: var(--rv-ink); font: inherit; font-size: 15px; cursor: pointer; }

	.trap { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
	.foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; padding-top: 24px; border-top: var(--rv-line-w) solid var(--rv-band-line); }
	@media (prefers-reduced-motion: reduce) { .loader i { animation: none; } }
</style>
