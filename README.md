# Portfolio — Oliver Kientzler

[![CI](https://github.com/Rev0li/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Rev0li/portfolio/actions/workflows/ci.yml)

Portfolio personnel auto-hébergé, en **SvelteKit** (Svelte 5, TypeScript, adapter-node),
déployé en conteneur Docker sur un NAS. Le style vient de [MyCss](https://github.com/Rev0li/MyCss).

## Stack

- **App** : SvelteKit 2 + Svelte 5 (runes), TypeScript — versions alignées sur rev0auth
- **Style** : tokens `--rv-*` de MyCss
- **Infra** : Docker multi-stage (Node 22 Alpine, utilisateur non-root, système de fichiers en lecture seule), Docker Compose
- **CI** : GitHub Actions — `svelte-check`, vitest, build, image Docker

## Lancer en local

```sh
npm install
npm run dev        # http://localhost:5173

npm run check      # types
npm test           # tests
docker compose up --build   # image de prod, http://localhost:49154
```

## Structure

```
src/routes/          Pages (SvelteKit)
src/lib/             Code partagé ; src/lib/server/ = côté serveur seulement
src/hooks.server.ts  En-têtes de sécurité sur chaque réponse
static/              Fichiers servis tels quels
docs/                Vision, décisions, architecture, roadmap
```

## Déploiement

Le conteneur tourne sur le NAS et écoute en HTTP sur le port interne 3000,
publié sur le port hôte 49154 (`docker-compose.yml`). Le NAS est joignable
via Tailscale depuis le VPS, qui héberge le reverse proxy public et termine
le TLS :

```
reverse_proxy <ip-tailscale-nas>:49154
```
