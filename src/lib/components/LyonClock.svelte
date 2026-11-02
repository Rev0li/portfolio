<script lang="ts">
	import { lyonTime } from '$lib/clock';

	let now = $state(lyonTime(new Date()));

	$effect(() => {
		const id = setInterval(() => (now = lyonTime(new Date())), 15_000);
		return () => clearInterval(id);
	});
</script>

<time>{now}</time>
