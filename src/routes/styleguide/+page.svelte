<script lang="ts">
	import NextQuestion from '$lib/components/NextQuestion.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import Window from '$lib/components/Window.svelte';
	import { pageTitle } from '$lib/site';

	const swatches = ['bg', 'surface', 'panel', 'ink', 'muted', 'turq', 'turq-ink', 'rose', 'rose-ink', 'ocre', 'violet', 'violet-ink'];
</script>

<svelte:head>
	<title>{pageTitle('Composants')}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<SiteHeader />

<main id="top" class="sg">
	<header class="intro">
		<p class="rv-label rv-muted">[ MyCss v1.2 · brouillon ]</p>
		<h1>Composants Rev0</h1>
		<p class="rv-muted">Tout ce qui est ici sort de la planche UX/UI. Le bouton lune/soleil du haut bascule le thème.</p>
	</header>

	<section aria-labelledby="h-couleurs">
		<h2 id="h-couleurs" class="rv-label">[ 01 ] Couleurs</h2>
		<ul class="swatches">
			{#each swatches as s (s)}
				<li><span class="chip" style:background="var(--rv-{s})"></span><code class="rv-mono">--rv-{s}</code></li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="h-typo">
		<h2 id="h-typo" class="rv-label">[ 02 ] Typographie</h2>
		<p class="hero">Samouraï</p>
		<p class="h2">Titre de section</p>
		<p class="lg">Texte large, pour une accroche ou une phrase-clé.</p>
		<p>Texte courant en Schibsted Grotesk, 17 px.</p>
		<p class="rv-px tagline">Samouraï des fourneaux, devenu sensei de la prod.</p>
		<p class="rv-label">[ étiquette mono ]</p>
	</section>

	<section aria-labelledby="h-boutons">
		<h2 id="h-boutons" class="rv-label">[ 03 ] Boutons et liens</h2>
		<div class="row">
			<button class="rv-pill" type="button">Pilule</button>
			<button class="rv-pill solid" type="button">Pilule pleine</button>
			<button class="rv-pill big" type="button">Grande pilule ▾</button>
			<a class="rv-pill gel big" href="#top">Voir le projet →</a>
		</div>
		<div class="row">
			<a class="rv-ulink" href="#top">Lien souligné</a>
			<span class="rv-label" style="display: inline-flex; align-items: center; gap: 10px"><span class="rv-dot" aria-hidden="true"></span>[ Disponible — CDI · mars 2027 ]</span>
		</div>
	</section>

	<section aria-labelledby="h-fenetres">
		<h2 id="h-fenetres" class="rv-label">[ 04 ] Fenêtres</h2>
		<p class="rv-muted">Glisse une fenêtre par sa barre ; double-clic pour la replacer.</p>
		<div class="row top">
			<Window title="moi.png" class="moi">
				<div class="moi-pic">
					<img src="/img/chibi-560.webp" alt="Oliver en version chibi, lunettes rondes et chignon, devant son ordinateur" width="272" height="272" />
				</div>
			</Window>
			<Window title="message.txt" class="msg">
				<p class="msg-body">Une fenêtre sert à mettre en avant un seul objet : l'avatar, la stack, la pipeline, le message.</p>
			</Window>
		</div>
	</section>

	<section aria-labelledby="h-suite">
		<h2 id="h-suite" class="rv-label">[ 05 ] Question de bas de section</h2>
		<NextQuestion href="#top" question="Et concrètement, ça donne quoi ?" />
	</section>
</main>

<style>
	.sg { display: flex; flex-direction: column; gap: 72px; padding: 72px var(--rv-gutter) 140px; }
	.intro h1 { margin: 8px 0 12px; font-size: var(--rv-text-h2); letter-spacing: var(--rv-track-h2); line-height: .95; font-weight: 800; }
	.intro p { margin: 0; }
	section { display: flex; flex-direction: column; gap: 20px; }
	h2 { margin: 0; padding-top: 16px; border-top: var(--rv-line-w) solid var(--rv-line); font-weight: 500; }
	.swatches { margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
	.swatches li { display: flex; align-items: center; gap: 10px; font-size: 13px; }
	.chip { width: 36px; height: 36px; border-radius: var(--rv-radius-sm); border: var(--rv-line-w) solid var(--rv-line-strong); }
	.hero { margin: 0; font-size: var(--rv-text-hero); line-height: .86; letter-spacing: var(--rv-track-hero); font-weight: 900; }
	.h2 { margin: 0; font-size: var(--rv-text-h2); line-height: .95; letter-spacing: var(--rv-track-h2); font-weight: 800; }
	.lg { margin: 0; font-size: var(--rv-text-lg); }
	.tagline { margin: 0; font-size: 22px; color: var(--rv-turq-ink); }
	p { margin: 0; }
	.row { display: flex; flex-wrap: wrap; align-items: center; gap: 16px 24px; }
	.row.top { align-items: flex-start; gap: 40px; }
	:global(.moi) { flex: 0 0 300px; }
	.moi-pic {
		height: 284px; display: flex; align-items: flex-end; justify-content: center;
		background-color: color-mix(in oklab, var(--rv-turq) 14%, var(--rv-surface));
		background-image: radial-gradient(var(--rv-dots) 1px, transparent 1.4px);
		background-size: 14px 14px;
	}
	.moi-pic img { display: block; width: 272px; height: 272px; object-fit: contain; }
	:global(.msg) { flex: 0 1 380px; }
	.msg-body { padding: 20px; line-height: 1.55; }
</style>
