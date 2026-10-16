# 02 — Architecture (de départ)

> ⚠️ **Architecture de départ, susceptible d'évoluer.** Ce document est un point
> de départ, pas un contrat. Quand l'archi change en cours de route, mettre ce
> fichier à jour et noter le changement.

## Vue d'ensemble

```
Visiteur ──HTTPS──▶ VPS (reverse proxy, TLS)
                        │ Tailscale
                        ▼
                  NAS : conteneur portfolio (SvelteKit / Node, port 3000 → 49154)
                        │
                        ├─▶ pages pré-rendues FR / EN (contenu statique)
                        ├─▶ /api/live     ──▶ sondes de statut des services (cache court)
                        └─▶ /api/contact  ──▶ envoi du message vers l'alias anonaddy
```

## Composants
| Composant | Rôle | Techno |
|---|---|---|
| `MenuBar` | Barre fixe : nom, langue, thème, horloge, statut live | Svelte |
| `Window` | Habillage System 7 / Aqua d'une section | Svelte + CSS MyCss |
| Hero | Nom, intitulé, phrase d'accroche, statut de disponibilité, avatar pixel | Svelte |
| Bandeau live | Services en ligne, dernier déploiement, mises à jour récentes | Svelte + `/api/live` |
| Schéma pipeline | Vulgarisation du CI/CD du stage (ADR-005) | SVG inline + Svelte |
| Section IA & workflow | 3-4 cas factuels avant/après | Svelte |
| Projets | Fiches SongSurf (teaser vidéo), rev0auth, infra, Transcendence, + petits projets | Svelte |
| Parcours | Timeline cuisine → Revoli → 42 → stage DevOps | Svelte |
| Contact | Liens + formulaire | Svelte + `/api/contact` |
| Contenu | Tous les textes, FR + EN | Paraglide (messages) |

## Ordre de la page (lecture d'un non-tech)
1. **Hero** — comprendre en 5 secondes.
2. **Bandeau live** — « tout ça tourne vraiment ».
3. **Ma méthode** — schéma du pipeline.
4. **L'IA dans mon workflow** — le différenciateur.
5. **Projets** — la preuve par le produit.
6. **Parcours** — l'histoire humaine.
7. **Contact** — la conversion.

## Flux principaux
1. **Première visite** : requête → page pré-rendue dans la langue du navigateur
   (FR par défaut) → le bandeau live se remplit côté client via `/api/live` ;
   si l'API échoue, il affiche un état neutre, jamais d'erreur.
2. **Contact** : formulaire → `/api/contact` → honeypot + rate-limit + validation
   → envoi vers l'alias anonaddy → message de confirmation dans la langue du visiteur.
3. **Changement de langue / thème** : depuis la barre de menu, mémorisé dans le navigateur.

## Données & secrets
- Aucune base de données en v1.
- Secrets (fichier `.env`, jamais commité) : identifiants d'envoi du mail de
  contact ; éventuelles cibles des sondes live.
- `/api/live` ne renvoie que des booléens / dates agrégées : **aucune IP, aucun
  nom d'hôte interne, aucun port**.

## Points d'évolution anticipés
- **Fusion** dans le site unifié rev0auth (après la phase 3 de Collapse) : la
  page devient `/`, le login membre passe sur `/login`.
- Domaine pro au moment de la fusion.
- Vitrine SongSurf interactive (« la run », billet d'accès, voir
  `~/dev/SongSurf/docs/VITRINE_IDEAS.md`) quand SongSurf V1 + rôle `demo` existeront.
