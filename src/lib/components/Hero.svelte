<script lang="ts">
	import { tick } from 'svelte';
	import { hero, peek, stack, stackLabels } from '$lib/content/home';
	import { icons } from '$lib/content/icons';
	import ScrambleName from './ScrambleName.svelte';
	import StackApp from './StackApp.svelte';
	import Window from './Window.svelte';

	const count = stack.reduce((n, [, tools]) => n + tools.length, 0);
	let open = $state(false);
	// Une fois dépliée, la stack ne coupe plus ce qui dépasse (fenêtre déplaçable).
	let settled = $state(false);
	let heroEl: HTMLElement;
	let stackEl: HTMLElement;

	const tiles = peek.map(([name, key, tile]) => {
		const [hex, d] = icons[key];
		const brand = `#${key === 'angular' ? 'DD0031' : hex}`;
		return { name, d, brand, tile: tile ?? `color-mix(in oklab, ${brand} 12%, var(--rv-surface))` };
	});

	async function toggle() {
		const willOpen = !open;
		settled = false;
		// La page glisse en même temps que la stack se déplie ou se replie, pour que le bas
		// du premier volet reste calé sur le bas de l'écran. Hauteur finale mesurée d'avance
		// (état final appliqué sans transition le temps d'une lecture, rien n'est affiché
		// entre-temps) pour que les deux mouvements partent ensemble.
		stackEl.style.transition = 'none';
		stackEl.classList.toggle('open', willOpen);
		const heroBottom = heroEl.getBoundingClientRect().bottom + scrollY;
		stackEl.classList.toggle('open', !willOpen);
		void stackEl.offsetHeight; // réapplique l'état de départ avant de relancer la transition
		stackEl.style.transition = '';

		open = willOpen;
		await tick();
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (willOpen && reduce) settled = true; // pas de transition, donc pas de fin de transition
		// Filet si la fin de transition n'arrive jamais (constaté sur iPhone)
		if (willOpen) setTimeout(() => open && (settled = true), 600);
		const target = Math.max(0, heroBottom - innerHeight);
		// à l'ouverture on ne fait que descendre, à la fermeture que remonter
		const top = willOpen ? Math.max(scrollY, target) : Math.min(scrollY, target);
		if (top !== scrollY) scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
	}
</script>

<section class="rv-sec hero" aria-labelledby="h-hero" bind:this={heroEl}>
	<div class="top">
		<p class="rv-px tagline">{hero.tagline}</p>
		<span class="rv-label status"><span class="rv-dot" aria-hidden="true"></span>{hero.status}</span>
	</div>

	<div class="middle">
		<div class="name-col">
			<ScrambleName id="h-hero" text={hero.name} label={hero.nameLabel} />
			<p class="def rv-mono rv-muted"><i>{hero.definition.word}</i>{hero.definition.rest}</p>
		</div>
		<Window title="moi.png" class="moi">
			<div class="pic">
				<img src="/img/chibi-560.webp" alt={hero.avatarAlt} width="272" height="272" />
			</div>
		</Window>
	</div>

	<div class="bottom rv-hair">
		<p class="statement">{hero.statement[0]}<br /><span class="rv-muted">{hero.statement[1]}</span></p>
		<div class="tools-row">
			<ul class="peek" aria-label={stackLabels.peek}>
				{#each tiles as t (t.name)}
					<li class="tile" style:--b={t.brand} style:--t={t.tile} title={t.name}>
						<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d={t.d} /></svg>
						<span class="rv-sr">{t.name}</span>
					</li>
				{/each}
			</ul>
			<button class="rv-pill big stack-btn" type="button" onclick={toggle} aria-expanded={open} aria-controls="stack-win">
				{open ? stackLabels.close : stackLabels.open(count - peek.length)}
				<span class="chev" class:up={open} aria-hidden="true">▾</span>
			</button>
		</div>
	</div>

	<div
		id="stack-win"
		bind:this={stackEl}
		class="stack"
		class:open
		class:settled
		inert={!open}
		ontransitionend={(e) => {
			if (open && e.target === e.currentTarget && e.propertyName === 'grid-template-rows') settled = true;
		}}
	>
		<div class="stack-in" class:settled><StackApp {count} /></div>
	</div>

	<a class="discover" href="#histoire">{hero.discover} <span class="rv-bob" aria-hidden="true">↓</span></a>
</section>

<style>
	.hero {
		justify-content: space-between; gap: 40px; box-sizing: border-box;
		min-height: calc(100svh - var(--rv-top)); padding-top: clamp(24px, 4.5vh, 48px); padding-bottom: clamp(16px, 2.5vh, 28px);
		background-image: radial-gradient(var(--rv-dots) 1px, transparent 1.4px);
		background-size: 18px 18px;
	}
	.top { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px 16px; }
	.tagline { margin: 0; font-size: 22px; line-height: 1.2; color: var(--rv-turq-ink); }
	.status { display: inline-flex; align-items: center; gap: 12px; font-size: 15px; font-weight: 500; }
	.status .rv-dot { width: 10px; height: 10px; }
	.middle { display: flex; flex-wrap: wrap; align-items: center; gap: 32px; }
	.name-col { flex: 1 1 520px; display: flex; flex-direction: column; gap: 26px; padding-top: 48px; }
	.def { margin: 0; font-size: 14px; letter-spacing: .02em; }
	.middle :global(.moi) { flex: 0 0 300px; }
	.pic {
		height: 284px; display: flex; align-items: flex-end; justify-content: center;
		background-color: color-mix(in oklab, var(--rv-turq) 14%, var(--rv-surface));
		background-image: radial-gradient(var(--rv-dots) 1px, transparent 1.4px);
		background-size: 14px 14px;
	}
	.pic img { display: block; width: 272px; height: 272px; object-fit: contain; }
	.bottom { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 28px 40px; padding-top: 32px; }
	.statement { margin: 0; max-width: 26em; font-size: 32px; line-height: 1.2; letter-spacing: -.025em; font-weight: 500; text-wrap: pretty; }
	.tools-row { display: flex; flex-wrap: wrap; align-items: center; gap: 16px 24px; }
	.peek { margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(4, 44px); gap: 8px; }
	.tile {
		width: 44px; height: 44px; display: grid; place-items: center;
		border: var(--rv-line-w) solid var(--rv-line); border-radius: var(--rv-radius-md);
		background: var(--t); color: var(--b);
		transition: transform var(--rv-dur) var(--rv-ease), border-color var(--rv-dur) var(--rv-ease);
	}
	.tile svg { fill: currentColor; }
	.tile:hover { border-color: var(--b); transform: translateY(-2px); }
	.stack-btn { min-width: 228px; justify-content: center; }
	.chev { display: inline-block; transition: transform var(--rv-dur) var(--rv-ease); }
	.chev.up { transform: rotate(180deg); }
	.stack {
		display: grid; grid-template-rows: 0fr; margin-top: -40px; opacity: 0; visibility: hidden; scroll-margin: 96px;
		transition: grid-template-rows .42s cubic-bezier(.2, .7, .2, 1), margin-top .42s cubic-bezier(.2, .7, .2, 1), opacity .25s ease, visibility 0s linear .42s;
	}
	.stack.open {
		grid-template-rows: 1fr; margin-top: 0; opacity: 1; visibility: visible;
		transition: grid-template-rows .42s cubic-bezier(.2, .7, .2, 1), margin-top .42s cubic-bezier(.2, .7, .2, 1), opacity .3s ease .08s, visibility 0s;
	}
	.stack-in { min-height: 0; overflow: hidden; padding: 0 6px 6px 0; }
	.stack-in.settled { overflow: visible; }
	/* Une fois ouverte, la hauteur suit le contenu sans animation : changer de domaine
	   (liste plus longue ou plus courte) ne doit pas rejouer le dépliage en coupant le bas */
	.stack.open.settled { transition: none; }
	.discover {
		align-self: center; display: inline-flex; flex-direction: column; align-items: center; gap: 6px;
		min-height: var(--rv-control-h); padding: 8px 18px; border-radius: 999px;
		font-size: 17px; font-weight: 700; text-decoration: none;
	}
	.discover:hover { color: var(--rv-turq-ink); }
	/* Mobile : tout en colonne, moi.png à droite sous le nom, 8 logos sur une ligne, stack pleine largeur */
	@media (max-width: 760px) {
		.hero { justify-content: flex-start; gap: 22px; padding-top: 24px; padding-bottom: 16px; }
		.top { flex-direction: column; gap: 10px; }
		.tagline { font-size: 17px; line-height: 1.25; }
		.status { gap: 10px; font-size: 11px; }
		.status .rv-dot { width: 7px; height: 7px; }
		.middle { flex-direction: column; align-items: stretch; gap: 14px; }
		.name-col { flex: none; gap: 14px; padding-top: 0; }
		.def { font-size: 12px; letter-spacing: .01em; line-height: 1.5; }
		.middle :global(.moi) { flex: none; width: 228px; align-self: flex-end; margin-top: -6px; }
		.pic { height: 196px; }
		.pic img { width: 190px; height: 190px; }
		.bottom { flex-direction: column; align-items: stretch; gap: 22px; padding-top: 20px; }
		.statement { font-size: 22px; letter-spacing: -.02em; }
		.tools-row { flex-direction: column; align-items: stretch; gap: 22px; }
		.peek { grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 6px; }
		.tile { width: auto; height: auto; aspect-ratio: 1; }
		.tile svg { width: 20px; height: 20px; }
		.stack-btn { width: 100%; min-width: 0; }
		.stack { margin-top: -22px; }
		.discover { gap: 4px; padding: 4px 18px; font-size: 16px; }
	}
	@media (prefers-reduced-motion: reduce) {
		.stack, .stack.open, .chev, .tile { transition: none; }
	}
</style>
