<script lang="ts">
	import { method } from '$lib/content/home';
	import NextQuestion from './NextQuestion.svelte';

	// Les barres « moi » et « IA » se remplissent quand le tableau entre à l'écran.
	function fillOnView(node: HTMLElement) {
		const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce || !('IntersectionObserver' in window)) {
			node.classList.add('on');
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					node.classList.add('on');
					io.disconnect();
				}
			},
			{ threshold: 0.7 }
		);
		io.observe(node);
		return { destroy: () => io.disconnect() };
	}
</script>

<section id="methode" class="rv-sec rv-hair compact" aria-labelledby="h-methode">
	<div class="head">
		<span class="rv-label rv-muted">{method.number}</span>
		<h2 id="h-methode" class="rv-h2">{method.title}</h2>
		<p class="sub">{method.sub} <span class="ai-txt">{method.subAi}</span></p>
	</div>

	<div class="lanes" role="table" aria-label={method.tableLabel} use:fillOnView>
		<div class="row" role="row">
			<span class="corner" role="columnheader"></span>
			{#each method.phases as phase, i (phase)}
				<span class="ph c{i + 1}" role="columnheader"><span class="rv-px">0{i + 1}</span><b>{phase}</b></span>
			{/each}
		</div>
		{#each [{ key: 'me', lane: method.me }, { key: 'ai', lane: method.ai }] as { key, lane } (key)}
			<div class="row" role="row">
				<span class="lane-h rv-label {key}" role="rowheader">
					{#if key === 'me'}
						<span class="av"><img src="/img/chibi-160.webp" alt="" width="32" height="32" /></span>
					{:else}
						<span class="av ai" aria-hidden="true">✦</span>
					{/if}
					{lane.label}
				</span>
				{#each lane.cells as cell, i (i)}
					<span class="cell {key} c{i + 1}" role="cell">
						<span>{cell.text}</span>
						{#if cell.chips}
							<span class="chips {key}">{#each cell.chips as chip (chip)}<i>{chip}</i>{/each}</span>
						{/if}
					</span>
				{/each}
			</div>
		{/each}
		<span class="bar me" aria-hidden="true"></span>
		<span class="bar ai" aria-hidden="true"></span>
	</div>

	<NextQuestion href="#contact" question={method.next.question} label={method.next.label} />
</section>

<style>
	.head { display: flex; flex-direction: column; gap: 12px; }
	.sub { margin: 0; font-size: 19px; letter-spacing: -.01em; }
	.ai-txt { color: var(--rv-violet-ink); font-weight: 600; }

	.lanes { display: grid; grid-template-columns: 104px repeat(5, minmax(0, 1fr)); row-gap: 8px; }
	.row { display: contents; }
	.corner, .ph { grid-row: 1; }
	.row:nth-child(2) > * { grid-row: 2; }
	.row:nth-child(3) > * { grid-row: 3; }
	.c1 { grid-column: 2; } .c2 { grid-column: 3; } .c3 { grid-column: 4; } .c4 { grid-column: 5; } .c5 { grid-column: 6; }

	.ph { display: flex; align-items: baseline; gap: 10px; padding: 0 16px; font-size: 17px; transition: color var(--rv-dur) var(--rv-ease); }
	.ph .rv-px { font-size: 15px; color: var(--rv-muted); }
	.lane-h { grid-column: 1; display: flex; align-items: center; gap: 10px; }
	.lane-h.ai { color: var(--rv-violet-ink); }
	.av {
		flex: none; width: 32px; height: 32px; display: grid; place-items: center; overflow: hidden; border-radius: 50%;
		border: 1.5px solid var(--rv-turq); background: color-mix(in oklab, var(--rv-turq) 14%, var(--rv-surface));
	}
	.av img { width: 32px; height: 32px; object-fit: cover; }
	.av.ai { border-color: var(--rv-violet); background: color-mix(in oklab, var(--rv-violet) 18%, var(--rv-surface)); font-size: 15px; }

	/* Cellules : plus marquées en clair, plus discrètes en sombre */
	.cell {
		position: relative; display: flex; flex-direction: column; gap: 12px;
		padding: 14px 16px 16px; font-size: 15px; line-height: 1.45;
		box-shadow: inset 1px 0 0 light-dark(rgba(28, 26, 27, .08), var(--rv-line));
		transition: background-color .2s ease;
	}
	.cell.c1 { border-radius: 14px 0 0 14px; box-shadow: none; }
	.cell.c5 { border-radius: 0 14px 14px 0; }
	.cell.me {
		font-weight: 500;
		background: light-dark(color-mix(in oklab, var(--rv-turq) 15%, var(--rv-surface)), color-mix(in oklab, var(--rv-turq) 7%, transparent));
	}
	.cell.ai {
		color: light-dark(color-mix(in oklab, var(--rv-ink) 78%, transparent), var(--rv-muted));
		background: light-dark(color-mix(in oklab, var(--rv-violet) 18%, var(--rv-surface)), color-mix(in oklab, var(--rv-violet) 9%, transparent));
	}
	.chips { display: flex; flex-wrap: wrap; gap: 6px; }
	.chips i {
		padding: 3px 9px; border-radius: 999px; font-style: normal; font-family: var(--rv-font-mono); font-size: 11px; font-weight: 400;
		border: var(--rv-line-w) solid light-dark(var(--rv-violet), color-mix(in oklab, var(--rv-violet) 60%, transparent));
		background: light-dark(var(--rv-surface), color-mix(in oklab, var(--rv-violet) 10%, var(--rv-surface)));
		color: var(--rv-violet-ink);
	}
	.chips.me i {
		border-color: light-dark(var(--rv-turq), color-mix(in oklab, var(--rv-turq) 70%, transparent));
		background: light-dark(var(--rv-surface), color-mix(in oklab, var(--rv-turq) 10%, var(--rv-surface)));
		color: var(--rv-turq-ink);
	}

	/* Survol d'une colonne : toute l'étape s'éclaire */
	.lanes:has(.c1:hover) .cell.me.c1, .lanes:has(.c2:hover) .cell.me.c2, .lanes:has(.c3:hover) .cell.me.c3,
	.lanes:has(.c4:hover) .cell.me.c4, .lanes:has(.c5:hover) .cell.me.c5 { background: color-mix(in oklab, var(--rv-turq) 18%, transparent); }
	.lanes:has(.c1:hover) .cell.ai.c1, .lanes:has(.c2:hover) .cell.ai.c2, .lanes:has(.c3:hover) .cell.ai.c3,
	.lanes:has(.c4:hover) .cell.ai.c4, .lanes:has(.c5:hover) .cell.ai.c5 { background: color-mix(in oklab, var(--rv-violet) 22%, transparent); }
	.lanes:has(.c1:hover) .ph.c1, .lanes:has(.c2:hover) .ph.c2, .lanes:has(.c3:hover) .ph.c3,
	.lanes:has(.c4:hover) .ph.c4, .lanes:has(.c5:hover) .ph.c5 { color: var(--rv-turq-ink); }

	/* Barres de progression des deux couloirs */
	.bar {
		grid-column: 2 / -1; align-self: start; height: 4px; margin: 0 14px; border-radius: 999px;
		transform-origin: left; pointer-events: none; z-index: 1;
		transform: scaleX(0); opacity: .3;
		transition: transform 1.8s cubic-bezier(.3, .6, .2, 1) .2s, opacity .8s ease .2s;
	}
	.bar.me { grid-row: 2; background: linear-gradient(to right, color-mix(in oklab, var(--rv-turq) 40%, transparent), var(--rv-turq) 30%); }
	.bar.ai { grid-row: 3; background: linear-gradient(to right, color-mix(in oklab, var(--rv-violet) 40%, transparent), var(--rv-violet) 30%); }
	.lanes:global(.on) .bar { transform: none; opacity: 1; }

	@media (prefers-reduced-motion: reduce) { .bar, .cell, .ph { transition: none; } }
</style>
