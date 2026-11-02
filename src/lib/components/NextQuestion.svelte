<script lang="ts">
	let { href, question, label }: { href: string; question: string; label?: string } = $props();
</script>

<a class="rv-next" {href}>
	<span class="rv-next-q">{question}</span>
	<span class="rv-bob" aria-hidden="true">↓</span>
	{#if label}<span class="rv-label rv-muted">{label}</span>{/if}
</a>
