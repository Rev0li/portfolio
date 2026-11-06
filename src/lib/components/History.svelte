<script lang="ts">
	import { history } from '$lib/content/home';
	import NextQuestion from './NextQuestion.svelte';
	import StickerOnigiri from './StickerOnigiri.svelte';
</script>

<section id="histoire" class="rv-sec rv-hair screen history" aria-labelledby="h-histoire">
	<div class="head">
		<span class="rv-label rv-muted">{history.number}</span>
		<h2 id="h-histoire" class="rv-h2">{history.title[0]}<br />{history.title[1]}<StickerOnigiri /></h2>
	</div>

	<div class="xp">
		<div class="bar" aria-hidden="true">
			<span class="blur"><span class="shape"></span></span>
			<span class="shape"></span>
			<span class="tick" style="left: 25%"></span>
			<span class="tick" style="left: 50%"></span>
			<span class="tick" style="left: 75%"></span>
		</div>
		<ol class="levels">
			{#each history.levels as lv (lv.tag)}
				<li class="lv" class:max={lv.current} style:--c={lv.color}>
					<span class="lv-head">
						<span class="rv-px tag">{lv.tag}</span>
						{#if lv.current}
							<span class="rv-label years-now"><span class="rv-dot" aria-hidden="true"></span>{lv.years}</span>
						{:else}
							<span class="rv-label rv-muted">{lv.years}</span>
						{/if}
					</span>
					<p class="txt"><b>{lv.title}</b>{lv.text}</p>
				</li>
			{/each}
		</ol>
	</div>

	<NextQuestion href="#projets" question={history.next.question} label={history.next.label} />
</section>

<style>
	.history { gap: clamp(28px, 5vh, 72px); }
	.head { display: flex; flex-direction: column; gap: 18px; }
	.xp { display: flex; flex-direction: column; gap: 22px; }
	.bar { position: relative; height: 10px; }
	.shape {
		position: absolute; inset: 0;
		background: linear-gradient(to right, var(--rv-ocre), var(--rv-rose) 37%, var(--rv-violet) 63%, var(--rv-turq) 88%);
		clip-path: polygon(0 65%, 100% 0, 100% 100%, 0 100%);
	}
	.blur { position: absolute; inset: 0; filter: blur(7px); opacity: .75; animation: aura 2.6s ease-in-out infinite; }
	@keyframes aura { 50% { opacity: .35; } }
	.tick { position: absolute; top: -4px; bottom: -4px; width: 4px; margin-left: -2px; background: var(--rv-bg); }
	.levels { margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 28px; align-items: start; }
	.lv { display: flex; flex-direction: column; gap: 14px; padding-top: 14px; }
	.lv-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
	.tag { font-size: 18px; color: light-dark(color-mix(in oklab, var(--c) 42%, var(--rv-ink)), color-mix(in oklab, var(--c) 55%, var(--rv-ink))); }
	.txt { margin: 0; font-size: 16px; line-height: 1.55; text-wrap: pretty; }
	.txt b { font-weight: 700; }
	.lv.max {
		margin: 0 0 0 -18px; padding: 14px 18px 20px; border-radius: 14px;
		background: color-mix(in oklab, var(--rv-turq) 9%, var(--rv-surface));
		border: var(--rv-line-w) solid color-mix(in oklab, var(--rv-turq) 45%, transparent);
	}
	.lv.max .tag { color: var(--rv-turq-ink); text-shadow: 0 0 12px color-mix(in oklab, var(--rv-turq) 60%, transparent); }
	.years-now { display: inline-flex; align-items: center; gap: 8px; }
	/* Tablette : niveaux en 2 × 2 (4 colonnes trop serrées), sans la barre qui suit les colonnes */
	@media (min-width: 761px) and (max-width: 1023px) {
		.bar { display: none; }
		.levels { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 40px; }
		.lv { border-top: 4px solid var(--c); }
		.lv.max { margin: 0; }
	}
	/* Mobile : frise XP verticale à gauche, un niveau sous l'autre */
	@media (max-width: 760px) {
		.history { gap: 36px; }
		.head { gap: 12px; }
		.bar { display: none; }
		.levels { position: relative; grid-template-columns: minmax(0, 1fr); gap: 22px; padding-left: 28px; }
		.levels::before {
			content: ''; position: absolute; left: 6px; top: 4px; bottom: 4px; width: 6px; border-radius: 999px;
			background: linear-gradient(to bottom, var(--rv-ocre), var(--rv-rose) 37%, var(--rv-violet) 63%, var(--rv-turq) 88%);
		}
		.lv { position: relative; gap: 8px; padding-top: 0; }
		.lv::before {
			content: ''; position: absolute; left: -28px; top: 4px; width: 18px; height: 18px; box-sizing: border-box;
			border-radius: 50%; border: 3px solid var(--c); background: var(--rv-bg);
		}
		.lv.max { margin: 0; padding: 14px 16px 16px; }
		.lv.max::before { top: 18px; }
		.tag { font-size: 17px; }
		.txt { line-height: 1.5; }
	}
	@media (prefers-reduced-motion: reduce) { .blur { animation: none; } }
</style>
