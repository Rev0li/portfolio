<script lang="ts">
	import { projects, type ProjectPreview } from '$lib/content/home';

	let { kind }: { kind: ProjectPreview } = $props();
	const t = projects.previews;
</script>

<!-- Aperçus animés de demo.app : purement décoratifs (le texte est à côté) -->
<div class="prev" aria-hidden="true">
	{#if kind === 'cicd'}
		<div class="pc">
			<span class="rv-mono cap">{t.cicdTop}</span>
			<div class="pc-row">
				{#each t.cicdSteps as step, i (step)}
					{#if i > 0}<i></i>{/if}<span>{step}</span>
				{/each}
			</div>
			<span class="rv-mono cap">{t.cicdBottom}</span>
		</div>
	{:else if kind === 'infra'}
		<div class="pi">
			<div class="pi-zones">{#each t.infraZones as z (z)}<span>{z}</span>{/each}</div>
			<div class="pi-row">
				{#each t.infraNodes as node, i (node)}
					{#if i > 0}<i></i>{/if}<span class="node">{node}</span>
				{/each}
				<span class="pi-dot"></span>
			</div>
			<div class="pi-svc">{#each t.infraServices as s (s)}<span>{s}</span>{/each}</div>
		</div>
	{:else if kind === 'auth'}
		<div class="pa">
			<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
			<span class="pa-f"></span><span class="pa-f"></span>
			<span class="pa-ok rv-mono">{t.authOk}</span>
		</div>
	{:else if kind === 'song'}
		<div class="ps">
			<span class="ps-eq">{#each Array(8) as _, i (i)}<i></i>{/each}</span>
			<span class="rv-mono ps-t">{t.song}</span>
		</div>
	{:else}
		<div class="pp">
			<span class="pp-l"></span><span class="pp-net"></span><span class="pp-b"></span><span class="pp-r"></span>
			<span class="rv-mono pp-s">{t.pong}</span>
		</div>
	{/if}
</div>

<style>
	.prev {
		position: relative; height: clamp(140px, 23vh, 300px); display: grid; place-items: center; overflow: hidden;
		border-bottom: var(--rv-line-w) solid var(--rv-line);
		background: color-mix(in oklab, var(--rv-turq) 7%, var(--rv-surface));
	}
	.cap { font-size: 11px; color: var(--rv-muted); }

	/* CI/CD : les étapes s'allument une à une */
	.pc { display: flex; flex-direction: column; align-items: center; gap: 18px; width: 100%; padding: 0 24px; box-sizing: border-box; }
	.pc-row { display: flex; align-items: center; width: 100%; }
	.pc-row span {
		flex: none; padding: 7px 9px; border: var(--rv-line-w) solid var(--rv-ink); border-radius: var(--rv-radius-sm);
		background: var(--rv-surface); font-size: 12px; font-weight: 600; white-space: nowrap;
	}
	.pc-row i { flex: 1; min-width: 6px; height: 2px; background: var(--rv-line); }
	/* Chaque étape s'allume à son tour (10 % du cycle de 6 s), puis tout s'éteint ensemble à 88 %. */
	.pc-row span:nth-of-type(1) { animation: l0 6s linear infinite; }
	@keyframes l0 { 0%, 8% { background: var(--rv-surface); color: var(--rv-ink); } 9%, 88% { background: var(--rv-turq); color: var(--rv-on-accent); } 100% { background: var(--rv-surface); color: var(--rv-ink); } }
	.pc-row span:nth-of-type(2) { animation: l1 6s linear infinite; }
	@keyframes l1 { 0%, 18% { background: var(--rv-surface); color: var(--rv-ink); } 19%, 88% { background: var(--rv-turq); color: var(--rv-on-accent); } 100% { background: var(--rv-surface); color: var(--rv-ink); } }
	.pc-row span:nth-of-type(3) { animation: l2 6s linear infinite; }
	@keyframes l2 { 0%, 28% { background: var(--rv-surface); color: var(--rv-ink); } 29%, 88% { background: var(--rv-turq); color: var(--rv-on-accent); } 100% { background: var(--rv-surface); color: var(--rv-ink); } }
	.pc-row span:nth-of-type(4) { animation: l3 6s linear infinite; }
	@keyframes l3 { 0%, 38% { background: var(--rv-surface); color: var(--rv-ink); } 39%, 88% { background: var(--rv-turq); color: var(--rv-on-accent); } 100% { background: var(--rv-surface); color: var(--rv-ink); } }
	.pc-row span:nth-of-type(5) { animation: l4 6s linear infinite; }
	@keyframes l4 { 0%, 48% { background: var(--rv-surface); color: var(--rv-ink); } 49%, 88% { background: var(--rv-turq); color: var(--rv-on-accent); } 100% { background: var(--rv-surface); color: var(--rv-ink); } }
	.pc-row span:nth-of-type(6) { animation: l5 6s linear infinite; }
	@keyframes l5 { 0%, 58% { background: var(--rv-surface); color: var(--rv-ink); } 59%, 88% { background: var(--rv-turq); color: var(--rv-on-accent); } 100% { background: var(--rv-surface); color: var(--rv-ink); } }
	.pc-row span:nth-of-type(7) { animation: l6 6s linear infinite; }
	@keyframes l6 { 0%, 68% { background: var(--rv-surface); color: var(--rv-ink); } 69%, 88% { background: var(--rv-turq); color: var(--rv-on-accent); } 100% { background: var(--rv-surface); color: var(--rv-ink); } }

	/* Infra : un point traverse le chemin */
	.pi { display: flex; flex-direction: column; gap: 14px; width: 100%; padding: 0 32px; box-sizing: border-box; }
	.pi-zones { display: grid; grid-template-columns: 1fr 3fr 1fr 1fr; gap: 6px; font-family: var(--rv-font-mono); font-size: 10px; letter-spacing: .06em; text-transform: uppercase; color: var(--rv-muted); }
	.pi-zones span { padding-top: 4px; border-top: 1px dashed var(--rv-line); }
	.pi-row { position: relative; display: flex; align-items: center; }
	.node { flex: none; padding: 7px 9px; border: var(--rv-line-w) solid var(--rv-ink); border-radius: var(--rv-radius-sm); background: var(--rv-surface); font-size: 12px; font-weight: 600; white-space: nowrap; }
	.pi-row i { flex: 1; height: 2px; min-width: 8px; background: var(--rv-line); }
	.pi-dot {
		position: absolute; top: 50%; left: 0; width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: 50%;
		background: var(--rv-turq); box-shadow: 0 0 0 4px color-mix(in oklab, var(--rv-turq) 30%, transparent);
		animation: travel 5s ease-in-out infinite;
	}
	@keyframes travel { 0% { left: 2%; opacity: 0; } 8% { opacity: 1; } 90% { opacity: 1; } 100% { left: 96%; opacity: 0; } }
	.pi-svc { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 6px; }
	.pi-svc span { font-family: var(--rv-font-mono); font-size: 11px; padding: 2px 8px; border-radius: 999px; border: var(--rv-line-w) solid color-mix(in oklab, var(--rv-turq) 60%, transparent); color: var(--rv-turq-ink); background: var(--rv-surface); }

	/* rev0auth : formulaire et rôle accepté */
	.pa { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 10px 18px; border: var(--rv-line-w) solid var(--rv-ink); border-radius: var(--rv-radius-md); background: var(--rv-surface); transform: scale(1.4); }
	.pa-f { width: 88px; height: 8px; border-radius: 4px; background: var(--rv-panel); }
	.pa-ok { font-size: 10px; color: var(--rv-turq-ink); }

	/* SongSurf : égaliseur */
	.ps { display: flex; flex-direction: column; align-items: center; gap: 10px; transform: scale(1.5); }
	.ps-eq { display: flex; align-items: flex-end; gap: 4px; height: 40px; }
	.ps-eq i { width: 7px; height: 100%; border-radius: 2px; background: var(--rv-rose); transform-origin: bottom; animation: eq 1.1s ease-in-out infinite alternate; }
	.ps-eq i:nth-child(2n) { animation-delay: -.4s; background: var(--rv-turq); }
	.ps-eq i:nth-child(3n) { animation-delay: -.7s; }
	.ps-eq i:nth-child(5) { animation-delay: -.2s; }
	@keyframes eq { from { transform: scaleY(.2); } to { transform: scaleY(1); } }
	.ps-t { font-size: 11px; color: var(--rv-muted); }

	/* Transcendence : pong */
	.pp { position: absolute; inset: 28px 40px; border: var(--rv-line-w) solid var(--rv-ink); border-radius: var(--rv-radius-sm); background: var(--rv-surface); }
	.pp-l, .pp-r { position: absolute; width: 5px; height: 30px; border-radius: 3px; background: var(--rv-ink); }
	.pp-l { left: 10px; animation: padl 2.4s ease-in-out infinite alternate; }
	.pp-r { right: 10px; animation: padr 2.4s ease-in-out infinite alternate; }
	.pp-net { position: absolute; left: 50%; top: 6px; bottom: 6px; border-left: 1px dashed var(--rv-line); }
	.pp-b { position: absolute; width: 9px; height: 9px; border-radius: 2px; background: var(--rv-turq); animation: ballx 2.4s linear infinite alternate, bally 1.7s ease-in-out infinite alternate; }
	.pp-s { position: absolute; top: 4px; left: 0; right: 0; text-align: center; font-size: 9px; color: var(--rv-muted); }
	@keyframes padl { from { top: 12%; } to { top: 58%; } }
	@keyframes padr { from { top: 55%; } to { top: 14%; } }
	@keyframes ballx { from { left: 18px; } to { left: calc(100% - 27px); } }
	@keyframes bally { from { top: 20%; } to { top: 72%; } }

	@media (prefers-reduced-motion: reduce) {
		.pc-row span, .pi-dot, .ps-eq i, .pp-l, .pp-r, .pp-b { animation: none; }
		.pc-row span { background: var(--rv-turq); color: var(--rv-on-accent); }
	}
</style>
