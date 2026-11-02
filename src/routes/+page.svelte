<script lang="ts">
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import { pageTitle } from '$lib/site';
</script>

<svelte:head>
	<title>{pageTitle()}</title>
</svelte:head>

<SiteHeader />
<main id="top" class="wip">
	<p class="rv-label rv-muted">[ en construction ]</p>
	<h1>Portfolio en reconstruction</h1>
</main>

<style>
	.wip { padding: 140px var(--rv-gutter); }
	h1 { margin: 0; font-size: var(--rv-text-h2); letter-spacing: var(--rv-track-h2); line-height: .95; }
</style>
