# Portfolio — Oliver Kientzler

[![CI](https://github.com/Rev0li/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Rev0li/portfolio/actions/workflows/ci.yml)

Portfolio personnel auto-hébergé : une page statique servie par un binaire **Rust / Axum**,
déployée en conteneur Docker sur un NAS.

## Stack

- **Serveur** : [Axum](https://github.com/tokio-rs/axum) + [tower-http](https://github.com/tower-rs/tower-http) — fichiers statiques, compression gzip, headers de sécurité
- **Front** : HTML/CSS vanilla, zéro framework, zéro JavaScript
- **Infra** : Docker multi-stage (image finale Debian slim, utilisateur non-root), Docker Compose

## Lancer en local

```sh
# Avec Docker
docker compose up --build

# Ou avec la toolchain Rust
cargo run
```

Le site est servi sur [http://localhost:3000](http://localhost:3000).
Le port est configurable via la variable d'environnement `PORT`.

## Structure

```
src/main.rs     Serveur Axum (~40 lignes)
static/         Contenu du site
Dockerfile      Build multi-stage : compilation puis image runtime minimale
```

## Déploiement

Le conteneur tourne sur le NAS et écoute en HTTP sur le port interne 3000,
publié sur le port hôte 49154 (`docker-compose.yml`). Le NAS est joignable
via Tailscale depuis le VPS, qui héberge le reverse proxy public et termine
le TLS :

```
reverse_proxy <ip-tailscale-nas>:49154
```
