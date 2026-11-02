<script lang="ts">
	import { tick } from 'svelte';
	import { hero, peek, stack, stackLabels } from '$lib/content/home';
	import { icons } from '$lib/content/icons';
	import ScrambleName from './ScrambleName.svelte';
	import StackApp from './StackApp.svelte';
	import Window from './Window.svelte';

	const count = stack.reduce((n, [, tools]) => n + tools.length, 0);
	let open = $state(false);
	let stackEl: HTMLElement;

	const tiles = peek.map(([name, key, tile]) => {
		const [hex, d] = icons[key];
		const brand = `#${key === 'angular' ? 'DD0031' : hex}`;
		return { name, d, brand, tile: tile ?? `color-mix(in oklab, ${brand} 12%, var(--rv-surface))` };
	});

	async function toggle() {
		open = !open;
		if (!open) return;
		await tick();
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		stackEl.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
	}
</script>

<section class="rv-sec hero" aria-labelledby="h-hero">
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

	<div id="stack-win" class="stack" class:open bind:this={stackEl} inert={!open}>
		<div class="stack-in"><StackApp {count} /></div>
	</div>

	<a class="discover" href="#histoire">{hero.discover} <span class="rv-bob" aria-hidden="true">↓</span></a>
</section>

<style>
	.hero {
		justify-content: space-between; gap: 40px; box-sizing: border-box;
		min-height: calc(100svh - 56px); padding-top: 48px; padding-bottom: 28px;
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
	.discover {
		align-self: center; display: inline-flex; flex-direction: column; align-items: center; gap: 6px;
		min-height: var(--rv-control-h); padding: 8px 18px; border-radius: 999px;
		font-size: 17px; font-weight: 700; text-decoration: none;
	}
	.discover:hover { color: var(--rv-turq-ink); }
	@media (prefers-reduced-motion: reduce) {
		.stack, .stack.open, .chev, .tile { transition: none; }
	}
</style>
