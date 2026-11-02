<script lang="ts">
	import { contact } from '$lib/content/home';
	import StickerEnvelope from './StickerEnvelope.svelte';
	import Window from './Window.svelte';
</script>

<!-- Toujours en thème sombre, quelle que soit la page : fond photo voilé.
     Pas de formulaire : un bouton « M'écrire » (mail) et les liens. -->
<section id="contact" class="rv-sec screen contact" data-theme="dark" aria-labelledby="h-contact">
	<div class="head">
		<span class="rv-label dim">{contact.number}</span>
		<h2 id="h-contact" class="title">{contact.title}<StickerEnvelope /></h2>
	</div>

	<div class="grid">
		<ul class="links">
			{#each contact.links as l (l.href)}
				<li><a id={'cv' in l ? 'cv' : undefined} class:cv={'cv' in l} href={l.href}>{l.label} <span aria-hidden="true">{l.icon}</span></a></li>
			{/each}
		</ul>

		<Window title={contact.window}>
			<div class="msg">
				<p class="pitch">{contact.pitch[0]}<br /><span class="dim">{contact.pitch[1]}</span></p>
				<a class="rv-pill gel big" href="mailto:{contact.email}">{contact.write} <span aria-hidden="true">↗</span></a>
				<span class="rv-mono mail dim">{contact.email}</span>
			</div>
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

	/* Liens en lignes larges : faciles à viser, flèche à droite */
	.links { margin: 0; padding: 0; list-style: none; border-bottom: var(--rv-line-w) solid var(--rv-band-line); }
	.links a {
		display: flex; align-items: center; justify-content: space-between; min-height: 64px;
		border-top: var(--rv-line-w) solid var(--rv-band-line);
		font-size: 24px; font-weight: 600; text-decoration: none;
		transition: color var(--rv-dur) var(--rv-ease), padding var(--rv-dur) var(--rv-ease);
	}
	.links a:hover { color: var(--rv-turq-ink); padding-left: 6px; }
	.links .cv { color: var(--rv-turq-ink); }

	.msg { display: flex; flex-direction: column; align-items: flex-start; gap: 18px; padding: clamp(22px, 3.4vh, 32px) 28px; }
	.pitch { margin: 0; font-size: 26px; line-height: 1.25; letter-spacing: -.02em; font-weight: 600; }
	.mail { font-size: 13px; overflow-wrap: anywhere; }
	.foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; padding-top: 24px; border-top: var(--rv-line-w) solid var(--rv-band-line); }
	@media (prefers-reduced-motion: reduce) { .links a { transition: none; } }
</style>
