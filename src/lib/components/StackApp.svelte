<script lang="ts">
	import { domainIcons, icons } from '$lib/content/icons';
	import { stack, stackLabels } from '$lib/content/home';
	import Window from './Window.svelte';

	let { count }: { count: number } = $props();
	let current = $state(0);
	let touched = $state(false); // la consigne mobile disparaît au premier choix

	const brand = (key: string) => {
		const hex = (icons[key] ?? icons.spark)[0];
		return hex ? `#${hex}` : 'var(--rv-turq)';
	};
	const path = (key: string) => (icons[key] ?? icons.spark)[1];
</script>

<Window title={stackLabels.title(count)}>
	<!-- Mobile : les 7 domaines en touches rétro toujours visibles, nom et position dessous -->
	<div class="doms">
		<div class="dom-grid" role="group" aria-label="Domaines">
			{#each stack as [domain], i (domain)}
				<button
					type="button"
					class="rv-key fitem"
					class:on={i === current}
					aria-pressed={i === current}
					aria-label={domain}
					title={domain}
					onclick={() => ((current = i), (touched = true))}
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d={domainIcons[i]} /></svg>
				</button>
			{/each}
		</div>
		<div class="dom-name" aria-live="polite">
			<b>{stack[current][0]}</b><span class="rv-label rv-muted">{stackLabels.domainPos(current + 1, stack.length, stack[current][1].length)}</span>
		</div>
		{#if !touched}<span class="rv-label rv-hint"><span class="rv-bob" aria-hidden="true">↑</span>{stackLabels.domainHint}</span>{/if}
	</div>
	<div class="grid">
		<div class="col dom-list" role="group" aria-label="Domaines">
			<span class="rv-label rv-muted head">{stackLabels.domains}</span>
			{#each stack as [domain, tools], i (domain)}
				<button type="button" class="item" class:on={i === current} aria-pressed={i === current} onclick={() => (current = i)}>
					<span>{domain}</span><span class="cnt rv-mono">{tools.length} ›</span>
				</button>
			{/each}
		</div>
		<div class="col tools-col">
			<span class="rv-label rv-muted head">{stackLabels.tools}</span>
			{#key current}
				<ul class="tools">
					{#each stack[current][1] as [name, where, icon], i (name)}
						<li class="tool" style:--d="{i * 35}ms" style:--b={brand(icon)}>
							<span class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d={path(icon)} /></svg></span>
							<span class="txt"><b>{name}</b><span class="rv-muted">{where}</span></span>
						</li>
					{/each}
				</ul>
			{/key}
		</div>
	</div>
</Window>

<style>
	.grid { display: grid; grid-template-columns: minmax(230px, 1fr) minmax(0, 2.6fr); min-height: 340px; }
	.col { display: flex; flex-direction: column; gap: 2px; min-width: 0; padding: 12px; border-right: var(--rv-line-w) solid var(--rv-line); }
	.tools-col { padding: 12px 16px; border-right: 0; }
	.head { padding: 6px 12px 10px; }
	.tools-col .head { padding: 6px 4px 10px; }
	.item {
		display: flex; align-items: center; justify-content: space-between; gap: 12px;
		min-height: var(--rv-control-h); padding: 0 12px;
		border: 0; border-radius: var(--rv-radius-sm);
		background: transparent; color: var(--rv-ink);
		font: inherit; font-size: 15px; text-align: left; cursor: pointer;
	}
	.item:hover { background: color-mix(in oklab, var(--rv-turq) 18%, transparent); }
	.item.on { background: var(--rv-ink); color: var(--rv-bg); }
	.cnt { font-size: 12px; opacity: .6; }
	.tools { margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 8px; }
	.tool {
		display: flex; align-items: flex-start; gap: 12px; padding: 12px;
		border: var(--rv-line-w) solid var(--rv-line); border-radius: var(--rv-radius-md);
		animation: cascade .28s ease both; animation-delay: var(--d, 0ms);
		transition: border-color var(--rv-dur) var(--rv-ease);
	}
	.tool:hover { border-color: var(--b); }
	.ico {
		flex: none; width: 40px; height: 40px; display: grid; place-items: center;
		border-radius: var(--rv-radius-md);
		background: color-mix(in oklab, var(--rv-ink) 6%, transparent); color: var(--rv-ink);
		transition: background-color var(--rv-dur) var(--rv-ease), color var(--rv-dur) var(--rv-ease);
	}
	.ico svg { fill: currentColor; }
	.tool:hover .ico { background: color-mix(in oklab, var(--b) 16%, transparent); color: var(--b); }
	.txt { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
	.txt b { font-size: 15px; font-weight: 600; }
	.txt .rv-muted { font-size: 13px; line-height: 1.4; }
	@keyframes cascade { from { opacity: 0; transform: translateY(-6px); } }
	.doms { display: none; }
	@media (max-width: 760px) {
		.doms { display: flex; flex-direction: column; gap: 10px; padding: 12px 12px 14px; border-bottom: var(--rv-line-w) solid var(--rv-line); }
		.dom-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 6px; }
		.fitem { aspect-ratio: 1; display: grid; place-items: center; padding: 0; border-radius: var(--rv-radius-md); }
		.fitem svg { width: 20px; height: 20px; }
		.fitem.on { background: var(--rv-ink); color: var(--rv-bg); }
		.dom-name { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
		.dom-name b { font-size: 17px; letter-spacing: -.01em; }
		.grid { grid-template-columns: minmax(0, 1fr); min-height: 0; }
		.dom-list, .tools-col .head { display: none; }
		.tools-col { padding: 12px; }
		.tools { grid-template-columns: minmax(0, 1fr); }
		.ico { width: 36px; height: 36px; background: color-mix(in oklab, var(--b) 14%, transparent); color: var(--b); }
	}
	@media (prefers-reduced-motion: reduce) { .tool { animation: none; } }
</style>
