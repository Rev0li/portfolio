<script lang="ts">
	import { onMount } from 'svelte';
	import { applyTheme, readTheme, toggleTheme, type Theme } from '$lib/theme';

	// Côté serveur on ne connaît pas le thème : on suppose clair, corrigé au montage.
	let theme = $state<Theme>('light');

	onMount(() => {
		theme = readTheme();
	});

	function flip() {
		theme = toggleTheme(theme);
		applyTheme(theme);
	}
</script>

<button
	class="rv-icon-btn"
	type="button"
	onclick={flip}
	aria-label={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
>
	{#if theme === 'dark'}
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
		</svg>
	{:else}
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
		</svg>
	{/if}
</button>
