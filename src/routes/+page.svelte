<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import History from '$lib/components/History.svelte';
	import Method from '$lib/components/Method.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import { pageTitle } from '$lib/site';
</script>

<svelte:head>
	<title>{pageTitle()}</title>
	<meta name="description" content="Ingénieur DevOps & IA à Lyon : CI/CD, Kubernetes, infra self-host. Disponible en CDI en mars 2027." />
</svelte:head>

<SiteHeader />
<main id="top">
	<Hero />
	<History />
	<Projects />
	<Method />
</main>
