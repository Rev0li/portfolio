import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		// Navigateurs qui gèrent light-dark(), color-mix() et :has() nativement.
		// Sans ça, le minifieur réécrit light-dark() avec des variables que nos
		// tokens (chargés depuis MyCss) ne posent pas, et les couleurs disparaissent.
		cssTarget: ['chrome123', 'edge123', 'firefox120', 'safari17.5']
	},
	test: {
		include: ['src/**/*.test.ts']
	}
});
