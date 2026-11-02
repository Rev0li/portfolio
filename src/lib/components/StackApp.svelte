<script lang="ts">
	import { icons } from '$lib/content/icons';
	import { stack, stackLabels } from '$lib/content/home';
	import Window from './Window.svelte';

	let { count }: { count: number } = $props();
	let current = $state(0);

	const brand = (key: string) => {
		const hex = (icons[key] ?? icons.spark)[0];
		return hex ? `#${hex}` : 'var(--rv-turq)';
	};
	const path = (key: string) => (icons[key] ?? icons.spark)[1];
</script>

<Window title={stackLabels.title(count)}>
	<div class="grid">
		<div class="col" role="group" aria-label="Domaines">
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
	@media (prefers-reduced-motion: reduce) { .tool { animation: none; } }
</style>
