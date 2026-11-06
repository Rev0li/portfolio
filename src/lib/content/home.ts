/**
 * Textes de la page d'accueil (FR). Aucun texte en dur dans les composants :
 * ce fichier passera dans les messages Paraglide avec PF-06.
 */

export const hero = {
	tagline: 'Samouraï des fourneaux, devenu sensei de la prod.',
	status: '[ Disponible — CDI · mars 2027 ]',
	name: 'Ingénieur\nDevOps & IA',
	nameLabel: 'Ingénieur DevOps et IA',
	definition: { word: 'ingénieur', rest: ', n. : celui qui conçoit, de l’idée à la mise en production.' },
	avatarAlt: 'Oliver en version chibi, lunettes rondes et chignon, devant son ordinateur',
	statement: ['Un site qui marche le jour J, c’est facile.', 'Qu’il marche encore dans un an, c’est mon métier.'],
	discover: 'Me découvrir'
} as const;

/** [nom affiché, clé d'icône, fond de tuile forcé (sinon teinte de la marque)] */
export const peek: readonly (readonly [string, string, string?])[] = [
	['Kubernetes', 'kubernetes'],
	['Docker', 'docker'],
	['Jenkins', 'jenkins'],
	['HashiCorp Vault', 'vault', '#000000'],
	['Grafana', 'grafana'],
	['Linux · Fedora', 'fedora'],
	['Java 25', 'java'],
	['Angular', 'angular']
];

export type Tool = readonly [name: string, where: string, icon: string];
export type StackDomain = readonly [domain: string, tools: readonly Tool[]];

export const stack: readonly StackDomain[] = [
	['DevOps & CI/CD', [
		['Kubernetes', 'Stage — déploiement d’une appli métier sur dev, IAT, UAT et prod.', 'kubernetes'],
		['Helm', 'Stage — charts de déploiement par environnement.', 'helm'],
		['GitOps', 'Stage — l’état voulu de chaque environnement est décrit dans Git.', 'git'],
		['Jenkins', 'Stage — pipelines de build et de tests.', 'jenkins'],
		['Bitbucket', 'Stage — dépôts, pull requests et revues de code.', 'bitbucket'],
		['Docker', 'Partout — stage, mes services perso, projets 42.', 'docker'],
		['GitHub Actions', 'Perso — CI de ce portfolio.', 'githubactions']
	]],
	['Sécurité & observabilité', [
		['HashiCorp Vault', 'Stage — secrets injectés, jamais dans le code.', 'vault'],
		['Prometheus', 'Stage — métriques des services.', 'prometheus'],
		['Grafana', 'Stage — tableaux de bord.', 'grafana'],
		['Tempo', 'Stage — traces des requêtes.', 'grafana'],
		['2FA · Argon2', 'Perso et 42 — rev0auth, Transcendence.', 'key']
	]],
	['Systèmes & réseau', [
		['Linux · Fedora', 'Perso — mon poste, installé et configuré par script.', 'fedora'],
		['SUSE SLES 15', 'Stage — serveurs de l’entreprise.', 'suse'],
		['Windows', 'Stage et perso — postes de travail.', 'windows'],
		['Tailscale', 'Perso — réseau privé entre mon NAS et mon VPS.', 'tailscale'],
		['Caddy · Nginx', 'Perso et 42 — reverse proxy et TLS.', 'caddy'],
		['NAS + VPS', 'Perso — mon infra self-host.', 'synology']
	]],
	['Backend & données', [
		['Java 25', 'Stage — refactorisation d’une appli métier.', 'java'],
		['Node.js', '42 et perso.', 'nodedotjs'],
		['Python', 'Perso — SongSurf.', 'python'],
		['PostgreSQL', 'Perso — rev0auth.', 'postgresql'],
		['SQLite · Prisma', '42 — Transcendence.', 'prisma'],
		['PHP · MySQL', 'Formation.', 'php']
	]],
	['Frontend', [
		['TypeScript', 'Partout — stage, perso, 42.', 'typescript'],
		['Angular 22', 'Stage — refactorisation et i18n.', 'angular'],
		['SvelteKit · Svelte 5', 'Perso et 42 — rev0auth, ce portfolio, Transcendence.', 'svelte'],
		['React · Next.js', 'Formation et entrepreneuriat.', 'react'],
		['HTML · CSS', 'Partout.', 'html5']
	]],
	['IA & automatisation', [
		['Claude Code', 'Au quotidien, piloté par tickets et revues.', 'claude'],
		['GitHub Copilot', 'Assistant de code dans l’éditeur.', 'githubcopilot'],
		['Agents & skills maison', 'Perso — audit, passage de main, docs, sessions.', 'spark'],
		['n8n', 'Perso — automatisation de workflows.', 'n8n'],
		['i18n automatisée', 'Stage — extraction des textes en dur d’une appli Java/Angular.', 'globe'],
		['Whisper local', 'Perso — dictée vocale 100 % locale (whisper-type).', 'openai']
	]],
	['Bas niveau & Web3', [
		['Scripts shell', 'Perso — sauvegardes, installation, fin des commandes répétitives.', 'gnubash'],
		['Dotfiles', 'Perso — mon environnement versionné et réinstallable.', 'term'],
		['C · C++', '42 — shell, tri, librairie standard, raytracer.', 'cplusplus'],
		['Lua', 'Perso.', 'lua'],
		['Solidity · ethers.js', 'Formation blockchain.', 'solidity']
	]]
];

export const stackLabels = {
	open: (more: number) => `+ ${more} · toute ma stack`,
	close: 'Fermer ma stack',
	title: (count: number) => `stack.app — ${count} outils`,
	domains: '[ domaine ]',
	tools: '[ outils · où je les utilise ]',
	peek: 'Outils principaux',
	domainHint: 'touchez un domaine',
	domainPos: (pos: number, total: number) => `[ ${pos} / ${total} ]`
} as const;

export type Level = { tag: string; years: string; title: string; text: string; color: string; current?: boolean };

export const history = {
	number: '[ 01 ]',
	title: ['Du coup de feu', 'au déploiement'],
	levels: [
		{ tag: 'LV.1', years: '2010 — 2020', title: 'Cuisinier', text: ' pendant dix ans, j’ai appris en plein coup de feu : la mise en place fait tout, un plat raté ne sort pas.', color: 'var(--rv-ocre)' },
		{ tag: 'LV.2', years: '2020 — 2024', title: 'Entrepreneur', text: ', j’ai lancé seul vidéo, e-commerce et sites web. Lancer, c’est facile. Faire tenir, beaucoup moins.', color: 'var(--rv-rose)' },
		{ tag: 'LV.3', years: '2024 — 2026', title: '42 Lyon', text: ', sans profs : apprendre des autres, se gérer seul, et relire le code d’un pair avec un œil critique mais constructif.', color: 'var(--rv-violet)' },
		{ tag: 'LV.MAX', years: '2026 — maintenant', title: 'Aujourd’hui', text: ', les commandes sont devenues des déploiements, la mise en place un pipeline, et le plat une idée servie en production, sécurisée.', color: 'var(--rv-turq)', current: true }
	] satisfies Level[],
	next: { question: 'Et concrètement, ça donne quoi ?', label: '[ 02 ] Projets' }
} as const;

export type ProjectPreview = 'cicd' | 'infra' | 'auth' | 'song' | 'kata';
export type Project = {
	n: string;
	preview: ProjectPreview;
	name: string;
	line: string;
	app: string;
	kind: string;
	/** type en version courte (tuiles mobile) */
	kindShort: string;
	pitch: string;
	href: string;
	cta: string;
	/** lien vers un autre site : s'ouvre avec ↗ au lieu de → */
	external?: boolean;
};

export const projects = {
	number: '[ 02 ]',
	title: 'Projets',
	sub: 'Pas de captures d’écran : survolez un projet, il se lance en version démo.',
	subMobile: 'Cinq projets, du plus important au plus ancien. Touchez-en un pour ouvrir sa page.',
	othersLabel: 'Autres projets',
	see: 'Voir le projet',
	listLabel: 'Projets, par ordre d’importance',
	items: [
		{ n: '01', preview: 'cicd', name: 'DevOps — Pipeline CI/CD', line: 'Une appli métier critique, de Git à Kubernetes.', app: 'pipeline.app', kind: 'Projet pro · en entreprise', kindShort: 'Pro', pitch: 'Suivez un merge jusqu’en production : build, registre d’images, GitOps, Kubernetes, secrets Vault et supervision.', href: '/projets/cicd', cta: 'Voir le cas d’étude' },
		{ n: '02', preview: 'infra', name: 'Infra self-host', line: 'NAS + VPS : le serveur qui fait tourner ce site.', app: 'infra.app', kind: 'Projet perso', kindShort: 'Perso', pitch: 'Suivez une requête à travers le pare-feu, le reverse proxy, l’auth et le tunnel, jusqu’à la maison.', href: '/projets/infra', cta: 'Lancer la démo' },
		{ n: '03', preview: 'auth', name: 'rev0auth', line: 'La porte d’entrée de tous mes services.', app: 'rev0auth.app', kind: 'Projet perso', kindShort: 'Perso', pitch: 'Connectez-vous avec un compte démo : une page vous est refusée, puis ouverte avec le bon rôle.', href: '/projets/rev0auth', cta: 'Lancer la démo' },
		{ n: '04', preview: 'song', name: 'SongSurf', line: 'Trouver, ranger, écouter sa musique.', app: 'songsurf.app', kind: 'Projet perso', kindShort: 'Perso', pitch: 'Une démo guidée avec un titre libre de droits. Envie d’accéder à la vraie version ? Écrivez-moi.', href: '/projets/songsurf', cta: 'Lancer la démo' },
		{ n: '05', preview: 'kata', name: 'Kata.io', line: 'Duel de kung-fu en 1 contre 1, dans le navigateur.', app: 'kata.io', kind: 'Projet perso', kindShort: 'Perso', pitch: 'Frappez, parez, esquivez : envoyez l’adversaire dans le lac. Seul contre les gardiens du temple, ou en duel avec un ami.', href: 'https://kata-io.vercel.app', cta: 'Jouer à Kata.io', external: true }
	] satisfies Project[],
	previews: {
		cicdTop: 'git push · commit a3f9c1',
		cicdSteps: ['Code', 'Revue', 'Build & tests', 'Image', 'GitOps', 'dev · IAT · UAT', 'prod'],
		cicdBottom: '7 étapes · 0 mise en prod à la main',
		infraZones: ['[ internet ]', '[ vps · public ]', '[ tunnel ]', '[ maison ]'],
		infraNodes: ['Visiteur', 'Pare-feu', 'Caddy', 'rev0auth', 'Tailscale', 'NAS'],
		infraServices: ['SongSurf', 'Seafile', 'Jellyfin', 'CouchDB', 'portfolio'],
		authOk: 'rôle : démo ✓',
		song: '♪ titre libre de droits',
		kata: 'premier à 3 éjections',
		leadPipe: ['Git', 'Build', 'Registre', 'GitOps', 'K8s']
	},
	next: { question: 'Et derrière, quelle méthode ?', label: '[ 03 ] Comment je travaille' }
} as const;

export type Lane = { text: string; chips?: readonly string[] };

export const method = {
	number: '[ 03 ]',
	title: 'Comment je travaille',
	sub: 'Je conçois, je pilote, je décide.',
	subAi: 'L’IA avance en parallèle, jamais à ma place.',
	tableLabel: 'Ce que je fais et ce que fait l’IA, de l’idée à la prod',
	phases: ['Idée', 'Conception', 'Réalisation', 'Vérification', 'Prod'],
	tabsLabel: 'Les 5 étapes, de l’idée à la prod',
	stepHint: 'touchez une étape',
	me: {
		label: 'moi',
		cells: [
			{ text: 'Je pars d’un besoin réel et je le formule.' },
			{ text: 'Je me documente, je conçois l’architecture et je découpe en tickets.', chips: ['doc officielle', 'Jira · GitHub Issues'] },
			{ text: 'Je cadre chaque ticket et je relis chaque diff.' },
			{ text: 'Je tranche : merge, ou retour en arrière.' },
			{ text: 'Je valide la mise en prod et je surveille.' }
		] satisfies Lane[]
	},
	ai: {
		label: 'IA',
		cells: [
			{ text: 'Je dicte, elle reformule et pose les questions qui fâchent.', chips: ['Whisper local'] },
			{ text: 'Elle cherche et compare les sources, puis challenge le plan.', chips: ['Perplexity', 'Claude Code'] },
			{ text: 'Code, tests, docs : elle exécute ce qui se répète.', chips: ['Claude Code', 'Copilot', 'skills maison'] },
			{ text: 'Audit, revue et tests en continu.', chips: ['agents d’audit', 'CI'] },
			{ text: 'Le pipeline enchaîne build, tests et déploiement, sans geste manuel.', chips: ['pipeline CI/CD complet'] }
		] satisfies Lane[]
	},
	next: { question: 'Un projet en tête ?', label: '[ 04 ] Contact' }
} as const;

export const contact = {
	number: '[ 04 ]',
	title: 'On en parle ?',
	links: [
		{ label: 'LinkedIn', icon: '↗', href: 'https://www.linkedin.com/in/oliver-kientzler-48088020a/' },
		{ label: 'GitHub', icon: '↗', href: 'https://github.com/Rev0li' },
		{ label: 'Télécharger le CV', icon: '↓', href: '/cv.pdf', cv: true }
	],
	email: 'chester.snyder143@anonaddy.me',
	window: 'message.txt',
	pitch: ['Un mot suffit.', 'Je réponds sous 48 h.'],
	write: 'M’écrire',
	footer: { built: '[ construit en SvelteKit, servi depuis mon NAS ]', copyright: '© 2026 Oliver Kientzler' }
} as const;

export const live = {
	label: 'live',
	region: 'Statut de mon infra en direct',
	pause: 'Mettre le défilement en pause',
	play: 'Relancer le défilement',
	self: 'portfolio en ligne',
	up: (name: string) => `${name} en ligne`,
	down: (name: string) => `${name} hors ligne`,
	latency: 'temps de réponse',
	deployed: 'dernier déploiement',
	commits: 'commits publics cette semaine'
} as const;
