<script lang="ts">
	import type { Snippet } from 'svelte';
	import '$lib/styles/fonts.css';
	import '$lib/styles/portfolio.css';

	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
