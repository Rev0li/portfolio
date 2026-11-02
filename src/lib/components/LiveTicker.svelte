<script lang="ts">
	import { onMount } from 'svelte';
	import { live } from '$lib/content/home';
	import { sinceText } from '$lib/relative';
	import type { LiveData } from '$lib/server/live';

	type Item = { text: string; value?: string; dot?: 'up' | 'down' };

	let data = $state<LiveData | null>(null);
	let now = $state(new Date());
	let paused = $state(false);

	onMount(() => {
		const load = () =>
			fetch('/api/live')
				.then((r) => (r.ok ? r.json() : null))
				.then((d: LiveData | null) => d && (data = d))
				.catch(() => {}); // état neutre : on garde ce qu'on a
		load();
		const refresh = setInterval(load, 60_000);
		const clock = setInterval(() => (now = new Date()), 30_000);
		return () => {
			clearInterval(refresh);
			clearInterval(clock);
		};
	});

	// Avant la réponse (ou si l'API échoue) : seulement ce que la page sait d'elle-même.
	const items = $derived.by<Item[]>(() => {
		const list: Item[] = [{ text: live.self, dot: 'up' }];
		for (const s of data?.services ?? []) list.push({ text: s.up ? live.up(s.name) : live.down(s.name), dot: s.up ? 'up' : 'down' });
		if (data?.latencyMs != null) list.push({ text: live.latency, value: `${data.latencyMs} ms` });
		list.push({ text: live.deployed, value: sinceText(data?.deployedAt ?? __BUILD_TIME__, now) });
		if (data?.commitsWeek != null) list.push({ text: live.commits, value: String(data.commitsWeek) });
		return list;
	});
</script>

{#snippet run(list: Item[])}
	{#each list as item, i (i)}
		<span class="ti">
			{#if item.dot}<span class="rv-dot" class:down={item.dot === 'down'} aria-hidden="true"></span>{/if}
			{item.text}{#if item.value}<b>[{item.value}]</b>{/if}
		</span>
		<span class="sep" aria-hidden="true">✦</span>
	{/each}
{/snippet}

<div class="rv-ticker" class:paused role="region" aria-label={live.region}>
	<div class="head">
		<button class="pause" type="button" onclick={() => (paused = !paused)} aria-pressed={paused} aria-label={paused ? live.play : live.pause}>
			{paused ? '▶' : '❚❚'}
		</button>
		<span class="rv-label lbl"><span class="rv-dot" aria-hidden="true"></span>{live.label}</span>
	</div>
	<div class="marquee rv-mono">
		<!-- Une copie lisible, les suivantes décoratives pour que la boucle ne laisse pas de trou -->
		<div class="track">
			<span class="group">{@render run(items)}{@render run(items)}{@render run(items)}</span>
			<span class="group" aria-hidden="true">{@render run(items)}{@render run(items)}{@render run(items)}</span>
		</div>
	</div>
</div>

<style>
	.rv-ticker {
		position: sticky; top: 56px; z-index: 4;
		display: flex; align-items: stretch; height: 32px; box-sizing: border-box;
		border-bottom: var(--rv-line-w) solid var(--rv-line);
		background: color-mix(in oklab, var(--rv-bg) 92%, transparent);
		backdrop-filter: blur(8px);
	}
	.head {
		position: relative; z-index: 1; flex: none;
		display: flex; align-items: center; gap: 12px; padding: 0 16px 0 24px;
		border-right: var(--rv-line-w) solid var(--rv-line); background: var(--rv-bg);
	}
	.lbl { display: inline-flex; align-items: center; gap: 8px; }
	.pause {
		width: 24px; height: 24px; display: grid; place-items: center; padding: 0;
		border: var(--rv-line-w) solid var(--rv-line); border-radius: var(--rv-radius-xs);
		background: transparent; color: var(--rv-ink); font: inherit; font-size: 9px; letter-spacing: -1px; cursor: pointer;
	}
	.pause:hover { border-color: var(--rv-ink); }
	.marquee { flex: 1; min-width: 0; display: flex; align-items: center; overflow: hidden; white-space: nowrap; font-size: 12px; }
	.track { display: inline-flex; animation: slide 60s linear infinite; }
	.group { display: inline-flex; align-items: center; gap: 40px; padding-right: 40px; }
	.rv-ticker:hover .track, .paused .track { animation-play-state: paused; }
	@keyframes slide { to { transform: translateX(-50%); } }
	.ti { display: inline-flex; align-items: center; gap: 8px; }
	.ti b { font-weight: 500; color: var(--rv-turq-ink); }
	.sep { color: var(--rv-turq-ink); }
	.rv-dot.down { background: var(--rv-danger); box-shadow: 0 0 0 3px color-mix(in oklab, var(--rv-danger) 30%, transparent); animation: none; }
	@media (prefers-reduced-motion: reduce) { .track { animation: none; } }
</style>
