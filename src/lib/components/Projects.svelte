<script lang="ts">
	import { onDestroy } from 'svelte';
	import { isAiming, type Point } from '$lib/aim';
	import { projects } from '$lib/content/home';
	import DemoPreview from './DemoPreview.svelte';
	import NextQuestion from './NextQuestion.svelte';
	import Window from './Window.svelte';

	let current = $state(0);
	const p = $derived(projects.items[current]);

	// Triangle de sécurité : voir $lib/aim
	let pts: Point[] = [];
	let pending: number | null = null;
	let timer: ReturnType<typeof setTimeout> | undefined;
	let demoEl: HTMLElement;

	const aiming = () => isAiming(pts, demoEl.getBoundingClientRect());

	function pick(i: number) {
		clearTimeout(timer);
		pending = null;
		current = i;
	}
	function onMove(e: MouseEvent) {
		pts = [...pts, { x: e.clientX, y: e.clientY }].slice(-4);
		if (pending != null && !aiming()) pick(pending);
	}
	function onLeave() {
		clearTimeout(timer);
		pending = null;
	}
	function onEnter(i: number) {
		clearTimeout(timer);
		if (!aiming()) return pick(i);
		pending = i;
		// la souris s'arrête sur la ligne : on la sélectionne
		let last = pts.at(-1);
		const check = () => {
			const now = pts.at(-1);
			if (now === last) pick(i);
			else if (pending === i) {
				last = now;
				timer = setTimeout(check, 120);
			}
		};
		timer = setTimeout(check, 120);
	}
	onDestroy(() => clearTimeout(timer));
</script>

<section id="projets" class="rv-sec rv-hair compact" aria-labelledby="h-projets">
	<div class="head">
		<div class="title">
			<span class="rv-label rv-muted">{projects.number}</span>
			<h2 id="h-projets" class="rv-h2">{projects.title}</h2>
		</div>
		<p class="sub rv-muted">{projects.sub}</p>
	</div>

	<div class="proj">
		<ol class="list" aria-label={projects.listLabel} onmousemove={onMove} onmouseleave={onLeave}>
			{#each projects.items as item, i (item.n)}
				<li>
					<button
						type="button"
						class="row"
						class:lead={i === 0}
						class:on={i === current}
						aria-pressed={i === current}
						aria-controls="demo-app"
						onclick={() => pick(i)}
						onfocus={() => pick(i)}
						onmouseenter={() => onEnter(i)}
					>
						<span class="rv-px n">{item.n}</span>
						<span class="txt"><span class="name">{item.name}</span><span class="line">{item.line}</span></span>
						<span class="arrow" aria-hidden="true">→</span>
					</button>
				</li>
			{/each}
		</ol>

		<div class="demo-col" bind:this={demoEl}>
			<Window title="demo.app — {p.app}">
				<div id="demo-app" aria-live="polite">
					<DemoPreview kind={p.preview} />
					<div class="foot">
						<div class="who">
							<span class="rv-label rv-muted">[ {p.n} / 05 ] {p.kind}</span>
							<b class="demo-name">{p.name}</b>
							<span class="rv-muted pitch">{p.pitch}</span>
						</div>
						<div class="cta">
							<a class="rv-pill gel" href={p.href}>{p.cta} <span aria-hidden="true">→</span></a>
							{#if p.soon}<span class="soon rv-mono">{p.soon}</span>{/if}
						</div>
					</div>
				</div>
			</Window>
		</div>
	</div>

	<NextQuestion href="#methode" question={projects.next.question} label={projects.next.label} />
</section>

<style>
	.head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px; }
	.title { display: flex; flex-direction: column; gap: 12px; }
	.sub { margin: 0; max-width: 24em; font-size: 19px; letter-spacing: -.01em; }
	.proj { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: 56px; align-items: start; }
	.list { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; border-bottom: var(--rv-line-w) solid var(--rv-line); }
	.row {
		width: 100%; display: grid; grid-template-columns: 52px minmax(0, 1fr) 28px; gap: 16px; align-items: center;
		padding: 22px 16px; border: 0; border-top: var(--rv-line-w) solid var(--rv-line);
		background: transparent; color: var(--rv-ink); font: inherit; text-align: left; cursor: pointer;
		transition: background-color var(--rv-dur) var(--rv-ease), color var(--rv-dur) var(--rv-ease);
	}
	.n { font-size: 20px; color: var(--rv-turq-ink); }
	.txt { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
	.name { font-size: 30px; font-weight: 800; letter-spacing: -.035em; line-height: 1.05; }
	.lead .name { font-size: 42px; }
	.line { font-size: 15px; line-height: 1.4; color: var(--rv-muted); }
	.arrow { font-size: 22px; opacity: 0; transform: translateX(-6px); transition: opacity var(--rv-dur) var(--rv-ease), transform var(--rv-dur) var(--rv-ease); }
	.row:hover { background: color-mix(in oklab, var(--rv-turq) 14%, transparent); }
	.row.on { background: var(--rv-turq); color: var(--rv-on-accent); }
	.row.on .n, .row.on .line { color: inherit; }
	.row.on .arrow { opacity: 1; transform: none; }
	.demo-col { position: sticky; top: 120px; }
	.foot { display: flex; flex-direction: column; gap: 20px; padding: 22px 24px 24px; }
	.who { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
	.demo-name { font-size: 32px; font-weight: 800; letter-spacing: -.03em; }
	.pitch { font-size: 16px; line-height: 1.45; }
	.cta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; }
	.soon { align-self: flex-start; margin-top: 6px; padding: 2px 8px; border: 1px dashed var(--rv-muted); border-radius: 999px; font-size: 11px; color: var(--rv-muted); }
	@media (prefers-reduced-motion: reduce) { .row, .arrow { transition: none; } }
</style>
