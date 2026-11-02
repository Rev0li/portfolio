// Types globaux SvelteKit : https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {}
	/** Date ISO du build (posée par Vite) : sert de « dernier déploiement ». */
	const __BUILD_TIME__: string;
}

export {};
