<script lang="ts">
	import type { Snippet } from 'svelte';
	import { windowStack } from '$lib/windows.svelte';

	let {
		title,
		draggable = true,
		class: extra = '',
		children
	}: { title: string; draggable?: boolean; class?: string; children: Snippet } = $props();

	const TIP = 'Glisser pour déplacer · double-clic pour replacer';
	const id = windowStack.next++;
	let x = $state(0);
	let y = $state(0);
	let moved = $state(false);
	let dragging = $state(false);
	let start: { px: number; py: number; x: number; y: number } | null = null;

	// Fenêtre déplacée : au-dessus du reste de la page ; la dernière saisie au-dessus des autres.
	// Toujours sous la barre du haut (z-index 5).
	const z = $derived(moved ? (windowStack.top === id ? 4 : 3) : undefined);

	function down(e: PointerEvent) {
		if (!draggable || e.button !== 0) return;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		start = { px: e.clientX, py: e.clientY, x, y };
		windowStack.top = id;
		moved = true;
		dragging = true;
	}
	function move(e: PointerEvent) {
		if (!start) return;
		x = start.x + e.clientX - start.px;
		y = start.y + e.clientY - start.py;
	}
	function up() {
		start = null;
		dragging = false;
	}
	function reset() {
		x = 0;
		y = 0;
	}
</script>

<div class="rv-win-wrap {extra}" style:--x="{x}px" style:--y="{y}px" style:z-index={z}>
	{#if dragging}<span class="rv-win-ghost" aria-hidden="true"></span>{/if}
	{#if draggable}<span class="rv-win-tip" aria-hidden="true">{TIP}</span>{/if}
	<div
		class="rv-win"
		class:rv-win-lifted={dragging}
		ontransitionend={(e) => {
			// revenue à sa place : elle rejoint le flux normal de la page
			if (e.target === e.currentTarget && e.propertyName === 'translate' && !x && !y && !dragging) moved = false;
		}}
	>
		<!-- Easter egg : la barre se déplace à la souris, double-clic pour replacer -->
		<div
			class="rv-win-bar"
			data-drag={draggable ? '' : undefined}
			role="presentation"
			onpointerdown={down}
			onpointermove={move}
			onpointerup={up}
			onpointercancel={up}
			ondblclick={reset}
		>
			<span class="rv-gels" aria-hidden="true">
				<span class="rv-gel rose"></span><span class="rv-gel ocre"></span><span class="rv-gel"></span>
			</span>
			<div class="rv-win-title"><span>{title}</span></div>
		</div>
		{@render children()}
	</div>
</div>
