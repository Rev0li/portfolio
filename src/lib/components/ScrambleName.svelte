<script lang="ts">
	import { onMount } from 'svelte';
	import { scrambleFrame } from '$lib/scramble';

	let { text, label, id }: { text: string; label: string; id?: string } = $props();

	// Rendu serveur : le texte final (lisible sans JavaScript et par les moteurs).
	let frameText = $state<string | null>(null);
	const shown = $derived(frameText ?? text);

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const total = 28;
		let frame = 0;
		const timer = setInterval(() => {
			frame += 1;
			frameText = scrambleFrame(text, frame, total);
			if (frame >= total) clearInterval(timer);
		}, 45);
		return () => clearInterval(timer);
	});
</script>

<h1 {id} class="name" aria-label={label}><span aria-hidden="true">{shown}</span></h1>

<style>
	.name {
		margin: 0;
		font-size: var(--rv-text-hero); line-height: .86;
		letter-spacing: var(--rv-track-hero); font-weight: 900;
		white-space: pre-line;
	}
</style>
