<script lang="ts">
	import DemoPreview from '$lib/components/DemoPreview.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Window from '$lib/components/Window.svelte';
	import { kataPage as t } from '$lib/content/home';
	import { pageTitle } from '$lib/site';

	let playing = $state(false);
	let frame = $state<HTMLIFrameElement>();
</script>

<svelte:head>
	<title>{pageTitle(t.title)}</title>
	<meta name="description" content={t.line} />
</svelte:head>

<header class="rv-nav">
	<a class="rv-nav-link" href="/#projets"><span aria-hidden="true">←&nbsp;</span>{t.back}</a>
	<span class="spacer"></span>
	<ThemeToggle />
</header>

<main class="page">
	<div class="head">
		<h1>{t.title}</h1>
		<p>{t.line}</p>
		<span class="rv-label rv-muted">{t.stack}</span>
		{#if playing}
			<a class="rv-ulink tab" href={t.url} target="_blank" rel="noopener">{t.openTab} <span aria-hidden="true">↗</span></a>
		{/if}
	</div>

	<!-- Ordinateur : le jeu dans une fenêtre, chargé seulement au clic -->
	<div class="pc">
		<Window title={t.window} draggable={false}>
			<div class="stage">
				{#if playing}
					<!-- Le focus donne le clavier au jeu dès son chargement -->
					<iframe
						bind:this={frame}
						src={t.url}
						title={t.frameTitle}
						allow="fullscreen; autoplay; clipboard-write"
						onload={() => frame?.focus()}
					></iframe>
				{:else}
					<div class="poster">
						<div class="art"><DemoPreview kind="kata" /></div>
						<button class="rv-pill gel big" type="button" onclick={() => (playing = true)}>{t.launch}</button>
						<span class="rv-muted">{t.launchHint}</span>
					</div>
				{/if}
			</div>
		</Window>
	</div>

	<!-- Tablette et mobile : lien direct, comme sur la Home -->
	<div class="small">
		<p class="rv-muted">{t.small}</p>
		<a class="rv-pill gel big" href={t.url}>{t.play} <span aria-hidden="true">↗</span></a>
	</div>
</main>

<style>
	.spacer { flex: 1; }
	.page { display: flex; flex-direction: column; gap: 20px; padding: 24px var(--rv-gutter) 32px; }
	.head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 20px; }
	h1 { margin: 0; font-size: 44px; line-height: 1; font-weight: 800; letter-spacing: -.04em; }
	.head p { margin: 0; font-size: var(--rv-text-lg); letter-spacing: -.01em; }
	/* 16:9, aussi grand que possible sans dépasser la hauteur de l'écran (barre, titre, marges) */
	.pc { width: min(100%, calc((100svh - 210px) * 16 / 9)); align-self: center; }
	.stage { aspect-ratio: 16 / 9; display: grid; }
	iframe { display: block; width: 100%; height: 100%; border: 0; }
	.poster { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; }
	.art { position: relative; width: min(420px, 60%); }
	.tab { margin-left: auto; font-size: 14px; }
	.small { display: none; }
	@media (max-width: 1023px) {
		.pc { display: none; }
		.small { display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
		.small p { margin: 0; }
		h1 { font-size: var(--rv-text-h2); }
	}
</style>
