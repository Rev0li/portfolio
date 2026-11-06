<script lang="ts">
	import { site } from '$lib/site';
	import LyonClock from './LyonClock.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="rv-nav">
	<div class="left">
		<a href="#top" class="rv-avatar" aria-label="Retour en haut">
			<img src="/img/chibi-160.webp" alt="" width="74" height="74" />
		</a>
		<a href={site.github} class="gh rv-mono">github/<b>Rev0li</b> <span aria-hidden="true">↗</span></a>
	</div>
	<span class="rv-label rv-muted center">[ Lyon, <LyonClock /> ]</span>
	<ThemeToggle />
	<a class="rv-nav-link" href="#contact">Contact</a>
	<a class="rv-nav-cta" href="/cv.pdf">CV <span aria-hidden="true">↓</span></a>
</header>

<style>
	.left { display: flex; align-items: center; gap: 12px; }
	.center { flex: 1; text-align: center; white-space: nowrap; }
	.gh {
		padding: 6px 0;
		border-bottom: var(--rv-line-w) solid transparent;
		font-size: 13px; text-decoration: none;
	}
	.gh:hover { border-bottom-color: currentColor; color: var(--rv-turq-ink); }
	@media (max-width: 760px) {
		/* Mobile : barre réduite à l'heure, au thème, à Contact et au CV */
		.left { display: none; }
		.center { text-align: left; }
	}
</style>
