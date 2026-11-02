<script lang="ts">
	let { href, question }: { href: string; question: string } = $props();
</script>

<a class="rv-next" {href}>
	<span class="rv-next-q">{question}</span>
	<span class="rv-bob" aria-hidden="true">↓</span>
</a>
