# 04 — Roadmap & ticketing

Dérivé de la vision, des décisions techniques et de l'architecture. Chaque ticket
a un fichier dans `docs/tickets/<ID>.md` (géré par le skill ticket-handoff).
Workflow Git : issue `[PF-xx]` → branche `feat/pf-xx` → PR → merge après validation.

## Sprints

### Sprint 0 — Contenu et maquette (phase 1 Collapse)
| Ticket | Titre | Dépend de | Statut |
|---|---|---|---|
| PF-01 | Contenu de référence FR (textes validés, CV aligné) | — | todo |
| PF-02 | Chiffres IA factuels | — | todo |
| PF-03 | Maquette visuelle validée (hero, barre de menu, fenêtre, schéma) | — | todo |

### Sprint 1 — Socle (phase 2 Collapse)
| Ticket | Titre | Dépend de | Statut |
|---|---|---|---|
| PF-04 | Init SvelteKit, Docker, CI | — | todo |
| PF-05 | Thème System 7 / Aqua sur MyCss (MenuBar, Window, clair/sombre) | PF-03, PF-04 | todo |
| PF-06 | i18n FR/EN avec Paraglide | PF-04 | todo |
| PF-07 | Hero, Parcours et avatar pixel | PF-01, PF-05, PF-06 | todo |

### Sprint 2 — Les preuves
| Ticket | Titre | Dépend de | Statut |
|---|---|---|---|
| PF-08 | Schéma interactif du pipeline CI/CD | PF-05 | todo |
| PF-09 | Section IA & workflow | PF-02, PF-05 | todo |
| PF-10 | Fiches projets (dont teaser SongSurf) | PF-01, PF-05 | todo |
| PF-11 | Bandeau live | PF-05 | todo |

### Sprint 3 — Contact et mise en ligne
| Ticket | Titre | Dépend de | Statut |
|---|---|---|---|
| PF-12 | Formulaire de contact | PF-06 | todo |
| PF-13 | Finitions : SEO, partage, accessibilité, performance | PF-07 → PF-12 | todo |
| PF-14 | Mise en production et retrait de l'ancien site Rust | PF-13 | todo |

## Principe de découpage
- 1 ticket = une unité **livrable et testable** (pas un epic).
- Le statut de référence vit dans chaque `docs/tickets/<ID>.md` ; ce tableau est
  une vue d'ensemble, à resynchroniser ponctuellement
  (`grep -l 'status: ...' docs/tickets/*.md`).

## Jalons
- **Plan validé (fin phase 1) :** PF-01, PF-02, PF-03 validés par l'utilisateur.
- **Home (phase 2) :** PF-04 → PF-07 : la page existe en FR/EN avec le thème, sur MyCss v1.
- **v1 publique :** PF-08 → PF-14 : toutes les sections, contact fonctionnel, en prod sur le NAS.
- **Plus tard :** fusion dans le site unifié rev0auth, domaine pro, vitrine SongSurf interactive.
