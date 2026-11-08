<script lang="ts">
	import { projects, type ProjectPreview } from '$lib/content/home';
	import { ico } from '$lib/mycss';

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
			<i class="rv-ico" style:--ico={ico('ui', 'lock')} style:--rv-ico-size="22px" aria-hidden="true"></i>
			<span class="pa-f"></span><span class="pa-f"></span>
			<span class="pa-ok rv-mono">{t.authOk}</span>
		</div>
	{:else if kind === 'song'}
		<div class="ps">
			<span class="ps-eq">{#each Array(8) as _, i (i)}<i></i>{/each}</span>
			<span class="rv-mono ps-t">{t.song}</span>
		</div>
	{:else}
		<div class="kt">
			<span class="rv-mono kt-s">{t.kata}</span>
			<span class="kt-dojo"><span class="kt-a"></span><span class="kt-b"></span></span>
			<span class="kt-lake"></span>
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

	/* Kata.io : duel sur le dojo, l'adversaire finit dans le lac */
	.kt { position: absolute; inset: 0; }
	.kt-s { position: absolute; top: 10px; left: 0; right: 0; text-align: center; font-size: 10px; color: var(--rv-muted); }
	.kt-lake {
		position: absolute; left: 0; right: 0; bottom: 0; height: 30%;
		background: repeating-linear-gradient(to bottom, color-mix(in oklab, var(--rv-turq) 34%, var(--rv-surface)) 0 6px, color-mix(in oklab, var(--rv-turq) 22%, var(--rv-surface)) 6px 12px);
		border-top: var(--rv-line-w) solid var(--rv-ink);
	}
	.kt-dojo {
		position: absolute; left: 22%; right: 22%; bottom: 30%; height: 12px; z-index: 1;
		border: var(--rv-line-w) solid var(--rv-ink); border-radius: 3px 3px 0 0;
		background: repeating-linear-gradient(to right, var(--rv-ocre) 0 14px, color-mix(in oklab, var(--rv-ocre) 70%, var(--rv-ink)) 14px 15px);
	}
	.kt-a, .kt-b {
		position: absolute; bottom: 100%; width: 18px; height: 26px; margin-bottom: 1px;
		border: var(--rv-line-w) solid var(--rv-ink); border-radius: 6px 6px 3px 3px;
	}
	.kt-a { left: 18%; background: var(--rv-turq); animation: kta 2.8s ease-in-out infinite; }
	.kt-b { right: 18%; background: var(--rv-rose); animation: ktb 2.8s ease-in infinite; }
	@keyframes kta { 0%, 20% { left: 18%; } 38% { left: 52%; } 46% { left: 46%; } 80%, 100% { left: 18%; } }
	@keyframes ktb {
		0%, 34% { right: 18%; bottom: 100%; rotate: 0deg; opacity: 1; }
		48% { right: -18%; bottom: 140%; rotate: 50deg; }
		62% { right: -32%; bottom: -150%; rotate: 120deg; opacity: 1; }
		63%, 80% { opacity: 0; right: 18%; bottom: 100%; rotate: 0deg; }
		100% { opacity: 1; }
	}

	@media (prefers-reduced-motion: reduce) {
		.pc-row span, .pi-dot, .ps-eq i, .kt-a, .kt-b { animation: none; }
		.pc-row span { background: var(--rv-turq); color: var(--rv-on-accent); }
	}
</style>
