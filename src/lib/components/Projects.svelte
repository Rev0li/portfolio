<script lang="ts">
	import { onDestroy } from 'svelte';
	import { isAiming, type Point } from '$lib/aim';
	import { projects } from '$lib/content/home';
	import DemoPreview from './DemoPreview.svelte';
	import NextQuestion from './NextQuestion.svelte';
	import Window from './Window.svelte';

	let current = $state(0);
	const p = $derived(projects.items[current]);
	const [lead, ...others] = projects.items;

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

<section id="projets" class="rv-sec rv-hair screen compact" aria-labelledby="h-projets">
	<div class="head">
		<div class="title">
			<span class="rv-label rv-muted">{projects.number}</span>
			<h2 id="h-projets" class="rv-h2">{projects.title}</h2>
		</div>
		<p class="sub rv-muted desk"><span class="hov">{projects.sub}</span><span class="tch">{projects.subTouch}</span></p>
		<p class="sub rv-muted mob">{projects.subMobile}</p>
	</div>

	<!-- Mobile : le projet phare en fenêtre avec aperçu, les 4 autres en tuiles ; toucher = ouvrir -->
	<div class="mob mob-proj">
		<a class="rv-win lead-card" href={lead.href}>
			<span class="rv-win-bar" aria-hidden="true">
				<span class="rv-gels"><span class="rv-gel rose"></span><span class="rv-gel ocre"></span><span class="rv-gel"></span></span>
				<span class="rv-win-title"><span>{lead.app}</span></span>
			</span>
			<span class="lead-prev" aria-hidden="true">
				<span class="pipe">
					{#each projects.previews.leadPipe as st (st)}<span class="st"><i></i><span class="rv-label">{st}</span></span>{/each}
					<span class="pipe-run"></span>
				</span>
			</span>
			<span class="lead-body">
				<span class="rv-mono pj-n">{lead.n}</span>
				<span class="pj-name">{lead.name}</span>
				<span class="pj-line">{lead.line}</span>
				<span class="lead-foot">
					<span class="rv-label pj-kind">{lead.kind}</span>
					<span class="pj-go">{projects.see} <span aria-hidden="true">→</span></span>
				</span>
			</span>
		</a>
		<ul class="tiles" aria-label={projects.othersLabel}>
			{#each others as item (item.n)}
				<li>
					<a class="tile" href={item.href}>
						<span class="rv-mono pj-n">{item.n}</span>
						<span class="pj-name">{item.name}</span>
						<span class="tile-foot">
							<span class="rv-label pj-kind">{item.kindShort}</span>
							<span class="pj-go" aria-hidden="true">{item.external ? '↗' : '→'}</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<div class="proj desk">
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
							<a class="rv-pill gel" href={p.href}>{p.cta} <span aria-hidden="true">{p.external ? '↗' : '→'}</span></a>
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
		padding: clamp(10px, 1.4vh, 22px) 16px; border: 0; border-top: var(--rv-line-w) solid var(--rv-line);
		background: transparent; color: var(--rv-ink); font: inherit; text-align: left; cursor: pointer;
		transition: background-color var(--rv-dur) var(--rv-ease), color var(--rv-dur) var(--rv-ease);
	}
	.n { font-size: 20px; color: var(--rv-turq-ink); }
	.txt { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
	.name { font-size: clamp(24px, 3.2vh, 30px); font-weight: 800; letter-spacing: -.035em; line-height: 1.05; }
	.lead .name { font-size: clamp(30px, 4.2vh, 42px); }
	.line { font-size: 15px; line-height: 1.4; color: var(--rv-muted); }
	.arrow { font-size: 22px; opacity: 0; transform: translateX(-6px); transition: opacity var(--rv-dur) var(--rv-ease), transform var(--rv-dur) var(--rv-ease); }
	.row:hover { background: color-mix(in oklab, var(--rv-turq) 14%, transparent); }
	.row.on { background: var(--rv-turq); color: var(--rv-on-accent); }
	.row.on .n, .row.on .line { color: inherit; }
	.row.on .arrow { opacity: 1; transform: none; }
	.demo-col { position: sticky; top: 120px; }
	.foot { display: flex; flex-direction: column; gap: clamp(12px, 2vh, 20px); padding: clamp(14px, 2.2vh, 22px) 24px clamp(16px, 2.4vh, 24px); }
	.who { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
	.demo-name { font-size: 32px; font-weight: 800; letter-spacing: -.03em; }
	.pitch { font-size: 16px; line-height: 1.45; }
	.cta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; }

	/* Mobile */
	.mob { display: none; }
	/* Écran tactile (tablette en paysage) : pas de survol, on dit « touchez » */
	.tch { display: none; }
	@media (hover: none) {
		.hov { display: none; }
		.tch { display: inline; }
	}
	.pj-n { font-size: 14px; font-weight: 500; color: var(--rv-turq-ink); }
	.pj-name { font-size: 24px; font-weight: 800; letter-spacing: -.03em; line-height: 1.05; }
	.pj-kind { padding: 1px 8px; border: var(--rv-line-w) solid var(--rv-line); border-radius: 999px; font-size: 10px; color: var(--rv-muted); white-space: nowrap; }
	.pj-go { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; font-size: 15px; font-weight: 700; color: var(--rv-turq-ink); }
	.mob-proj { flex-direction: column; gap: 12px; }
	.lead-card, .tile { text-decoration: none; color: var(--rv-ink); transition: transform .12s ease, box-shadow .12s ease; }
	.lead-card { display: block; }
	.lead-card:active, .tile:active { transform: translate(3px, 3px); box-shadow: 1px 1px 0 var(--rv-hard); }
	.lead-prev {
		display: flex; align-items: center; height: 112px; box-sizing: border-box; padding: 0 18px;
		border-bottom: var(--rv-line-w) solid var(--rv-ink);
		background-color: color-mix(in oklab, var(--rv-turq) 12%, var(--rv-surface));
		background-image: radial-gradient(var(--rv-dots) 1px, transparent 1.4px); background-size: 14px 14px;
	}
	.pipe { position: relative; flex: 1; display: flex; justify-content: space-between; }
	.pipe::before { content: ''; position: absolute; left: 12px; right: 12px; top: 11px; height: 2px; background: var(--rv-line-strong); }
	.st { position: relative; display: flex; flex-direction: column; align-items: center; gap: 8px; }
	.st i { display: block; width: 24px; height: 24px; box-sizing: border-box; border: var(--rv-line-w) solid var(--rv-ink); border-radius: 7px; background: var(--rv-surface); }
	.st:last-of-type i { background: var(--rv-turq); }
	.st .rv-label { font-size: 10px; color: var(--rv-muted); }
	.pipe-run {
		position: absolute; left: 6px; top: 6px; width: 12px; height: 12px; box-sizing: border-box; border-radius: 50%;
		border: var(--rv-line-w) solid var(--rv-ink); background: var(--rv-turq); animation: run 3.2s ease-in-out infinite;
	}
	@keyframes run { 0% { left: 6px; opacity: 0; } 10%, 85% { opacity: 1; } 100% { left: calc(100% - 18px); opacity: 0; } }
	.lead-body { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 6px 10px; padding: 16px 16px 14px; }
	.lead-body .pj-n { padding-top: 4px; }
	.pj-line { grid-column: 2; font-size: 14px; line-height: 1.35; color: var(--rv-muted); }
	.lead-foot { grid-column: 1 / 3; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px 12px; margin-top: 8px; }
	.tiles { margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
	.tiles li { display: flex; }
	.tile {
		flex: 1; display: flex; flex-direction: column; gap: 6px; min-height: 120px; box-sizing: border-box; padding: 12px 12px 10px;
		background: var(--rv-surface); border: var(--rv-line-w) solid var(--rv-ink); border-radius: var(--rv-radius-window);
		box-shadow: 3px 3px 0 var(--rv-hard);
	}
	.tile .pj-name { flex: 1; font-size: 19px; }
	.tile-foot { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
	.tile .pj-go { font-size: 18px; }
	@media (max-width: 1023px) {
		.desk { display: none; }
		.mob { display: flex; }
		p.mob { display: block; }
	}
	@media (min-width: 761px) and (max-width: 1023px) {
		.mob-proj { gap: 16px; }
		.lead-card { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); }
		.lead-card .rv-win-bar { grid-column: 1 / -1; }
		.lead-prev { height: auto; min-height: 200px; padding: 0 28px; border-bottom: 0; border-right: var(--rv-line-w) solid var(--rv-ink); }
		.lead-body { align-content: center; padding: 24px; }
		.lead-body .pj-name { font-size: 28px; }
		.pj-line { font-size: 15px; }
		.tiles { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
		.tile { min-height: 140px; padding: 14px; }
	}
	@media (max-width: 760px) {
		.head { flex-direction: column; align-items: stretch; gap: 10px; }
		.title { gap: 10px; }
		.sub { font-size: 16px; line-height: 1.4; max-width: none; }
	}
	@media (prefers-reduced-motion: reduce) {
		.row, .arrow, .lead-card, .tile { transition: none; }
		.pipe-run { animation: none; left: calc(100% - 18px); }
	}
</style>
