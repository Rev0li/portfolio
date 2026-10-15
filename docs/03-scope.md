# 03 — Scope, non-goals & risques

Le rempart anti scope-creep. Si une demande tombe dans les non-goals, on dit non
(ou on l'ajoute consciemment à la roadmap).

## Dans le scope (v1)
- Une page publique bilingue FR/EN, clair/sombre, mobile, dans l'ordre de `02-architecture.md`.
- Thème System 7 + touche Aqua sur les tokens MyCss v1 (rose pâle + turquoise).
- Avatar pixel (pas de photo).
- Schéma interactif du pipeline CI/CD du stage, anonymisé.
- Section IA & workflow avec des chiffres factuels et modestes.
- Fiches projets ; SongSurf présenté par une **vidéo teaser** (tunnel tuto :
  téléchargement d'un titre libre de droits, fonctionnalités principales).
- Bandeau live (statut des services, dernier déploiement).
- Contact : GitHub, LinkedIn, alias anonaddy, formulaire texte.
- CI GitHub Actions + déploiement Docker sur le NAS.

## Non-goals (hors scope, assumé)
- **Démo SongSurf interactive / bac à sable** : pour l'instant (après SongSurf V1 + rôle `demo`).
- **Fusion dans rev0auth** et domaine pro : pour l'instant (après la phase 3).
- **Faux bureau interactif** (fenêtres déplaçables) : jamais en v1 (ADR-003).
- **Blog, articles, CMS** : pour l'instant.
- **Téléphone, âge, situation familiale, photo** sur la page : jamais.
- **Nom de l'entreprise du stage, captures de son infra** : jamais.
- **Téléchargement public du CV en PDF** : à trancher (voir questions ouvertes).

## Risques
| Risque | Impact | Probabilité | Mitigation |
|---|---|---|---|
| Recoupement d'indices (secteur, maison mère, localisation, projets) qui identifie l'entreprise | Élevé | Moyenne | Projets internes décrits de façon générique ; faire relire les textes « stage » par le tuteur |
| Chiffres IA perçus comme gonflés | Élevé | Moyenne | Chiffres tirés des repos (vérifiables) ou minimisés ; une phrase de méthode à côté |
| Fuite d'infos infra via le bandeau live | Élevé | Faible | `/api/live` agrégé, revue sécurité dans le ticket |
| Spam via le formulaire | Moyen | Élevée | Honeypot + rate-limit + taille max |
| Le style rétro fait « gadget » | Moyen | Moyenne | Maquette validée avant le code (PF-03) ; règles MyCss : 2 couleurs fortes max, animations courtes |
| MyCss v1 en retard | Moyen | Moyenne | Thème du portfolio sur variables CSS locales, rebranchées sur MyCss dès la v1 |
| Coquilles dans les textes (FR et EN) | Moyen | Moyenne | Relecture dédiée dans PF-01 et PF-06 |

## Questions ouvertes
- [ ] **Envoi du formulaire de contact** — contrainte : gratuit, le plus simple possible, self-host si possible.
  Recommandation : **bot Telegram appelé directement par `/api/contact`** (un `fetch` vers la Bot API, zéro service en plus, notification instantanée sur le téléphone).
  Alternative self-host : **ntfy** dans un conteneur sur le NAS. n8n écarté : un service entier pour un seul appel HTTP.
- [ ] **Source du bandeau live** — piste « logs agrégés » écartée en v1 (lourd, risque de fuite).
  Recommandation : (1) sondes HTTP des services publics (en ligne / hors ligne) ; (2) API GitHub pour la date du dernier déploiement et le nombre de mises à jour de dépendances mergées (Dependabot/Renovate), ce qui raconte « je maintiens ». Le tout agrégé côté serveur et mis en cache.
- [x] **CV PDF téléchargeable** : oui, avec un **placeholder** pour l'instant ; le CV sera refait plus tard (sans téléphone dans la version publique).
- [ ] Le tuteur valide-t-il la description anonymisée du stage et la stack citée ?
- [ ] **Chiffres IA (PF-02)** — méthode décidée : partir d'une **moyenne publique** (études sur la productivité avec assistant IA, en citant la source) et du **temps homme estimé** pour ce projet (refonte Collapse), puis montrer le **temps réellement passé** (historique git, tickets). Toujours la fourchette basse.
- [x] **LinkedIn** : https://www.linkedin.com/in/oliver-kientzler-48088020a/

## Hypothèses
- MyCss v1 sortira pendant la phase 2 (dépendance Collapse).
- Le reverse proxy VPS → NAS reste en place pendant toute la v1.
- La vidéo teaser SongSurf est enregistrée par l'utilisateur ; la page ne fait que l'intégrer.
