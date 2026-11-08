/**
 * Icônes de la stack. Les fichiers SVG viennent de MyCss (assets/icons, voir $lib/mycss) ;
 * ici, seulement les clés connues et leur couleur de marque (null = accent du site),
 * recopiées de assets/icons/tools.json de MyCss. Un test vérifie que toutes les clés utilisées sont connues.
 */
export const toolColors: Record<string, string | null> = {
	kubernetes: '#326CE5',
	helm: '#0F1689',
	git: '#F05032',
	jenkins: '#D24939',
	bitbucket: '#0052CC',
	docker: '#2496ED',
	githubactions: '#2088FF',
	vault: '#FFEC6E',
	prometheus: '#E6522C',
	grafana: '#F46800',
	key: null,
	fedora: '#51A2DA',
	suse: '#0C322C',
	windows: '#0078D4',
	tailscale: '#242424',
	caddy: '#1F88C0',
	synology: '#B5B5B6',
	java: '#E76F00',
	nodedotjs: '#5FA04E',
	python: '#3776AB',
	postgresql: '#4169E1',
	prisma: '#2D3748',
	php: '#777BB4',
	typescript: '#3178C6',
	angular: '#0F0F11',
	svelte: '#FF3E00',
	react: '#61DAFB',
	html5: '#E34F26',
	claude: '#D97757',
	githubcopilot: '#000000',
	spark: null,
	n8n: '#EA4B71',
	globe: null,
	openai: '#412991',
	gnubash: '#4EAA25',
	term: null,
	cplusplus: '#00599C',
	lua: '#2C2D72',
	solidity: '#363636'
};

/** Clé d'icône sûre : une clé inconnue retombe sur « spark ». */
export const toolKey = (key: string) => (key in toolColors ? key : 'spark');

/** Pictos des 7 domaines de la stack (mobile : touches rétro), dans l'ordre de `stack`. */
export const domainIcons: readonly string[] = [
	'domaine-devops',
	'domaine-securite',
	'domaine-systemes',
	'domaine-backend',
	'domaine-frontend',
	'domaine-ia',
	'domaine-bas-niveau'
];
