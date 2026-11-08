<script lang="ts">
	import { onMount } from 'svelte';
	import { applyTheme, readTheme, toggleTheme, type Theme } from '$lib/theme';
	import { ico } from '$lib/mycss';

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
		<i class="rv-ico" style:--ico={ico('ui', 'sun')} style:--rv-ico-size="18px" aria-hidden="true"></i>
	{:else}
		<i class="rv-ico" style:--ico={ico('ui', 'moon')} style:--rv-ico-size="18px" aria-hidden="true"></i>
	{/if}
</button>
