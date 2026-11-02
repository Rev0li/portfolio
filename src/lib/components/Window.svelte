<script lang="ts" module>
	// Pile partagée : la dernière fenêtre déplacée passe au premier plan.
	let top = 1;
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		draggable = true,
		class: extra = '',
		children
	}: { title: string; draggable?: boolean; class?: string; children: Snippet } = $props();

	let x = $state(0);
	let y = $state(0);
	let z = $state(0);
	let start: { px: number; py: number; x: number; y: number } | null = null;

	function down(e: PointerEvent) {
		if (!draggable || e.button !== 0) return;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		start = { px: e.clientX, py: e.clientY, x, y };
		z = ++top;
	}
	function move(e: PointerEvent) {
		if (!start) return;
		x = start.x + e.clientX - start.px;
		y = start.y + e.clientY - start.py;
	}
	function up() {
		start = null;
	}
	function reset() {
		x = 0;
		y = 0;
	}
</script>

<div
	class="rv-win {extra}"
	style:transform={x || y ? `translate(${x}px, ${y}px)` : undefined}
	style:z-index={z || undefined}
>
	<!-- Easter egg : la barre se déplace à la souris, double-clic pour replacer -->
	<div
		class="rv-win-bar"
		data-drag={draggable ? '' : undefined}
		title={draggable ? 'Glisser pour déplacer · double-clic pour replacer' : undefined}
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
