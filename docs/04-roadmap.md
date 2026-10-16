# 04 — Roadmap & ticketing

Dérivé de la vision, des décisions techniques et de l'architecture. Chaque ticket
est une **issue GitHub** `[PF-xx]`, rattachée comme sous-issue à l'une des 4 User
Stories (#19 → #22). Les tickets locaux `docs/tickets/` sont abandonnés (2026-10-16).
Workflow Git : issue `[PF-xx]` → branche `feat/pf-xx` → PR (`Closes #n`) → merge après validation.

## Sprints

### Sprint 0 — Contenu et maquette (phase 1 Collapse)
| Ticket | Titre | Dépend de | Issue |
|---|---|---|---|
| PF-01 | Contenu de référence FR (textes validés, CV aligné) | — | [#3](https://github.com/Rev0li/portfolio/issues/3) |
| PF-02 | Chiffres IA factuels | — | [#4](https://github.com/Rev0li/portfolio/issues/4) |
| PF-03 | Maquette et planche UX/UI v1 (DA « Mélange ») | — | [#5](https://github.com/Rev0li/portfolio/issues/5) |
| PF-16 | Refonte de la version mobile | PF-03 | [#18](https://github.com/Rev0li/portfolio/issues/18) |

### Sprint 1 — Socle (phase 2 Collapse)
| Ticket | Titre | Dépend de | Issue |
|---|---|---|---|
| PF-04 | Init SvelteKit, Docker, CI | — | [#6](https://github.com/Rev0li/portfolio/issues/6) |
| PF-05 | Thème Rev0 (DA « Mélange ») sur MyCss | PF-03, PF-04 | [#7](https://github.com/Rev0li/portfolio/issues/7) |
| PF-06 | i18n FR/EN avec Paraglide | PF-04 | [#8](https://github.com/Rev0li/portfolio/issues/8) |
| PF-07 | Hero, Parcours et avatar chibi | PF-01, PF-05, PF-06 | [#9](https://github.com/Rev0li/portfolio/issues/9) |

### Sprint 2 — Les preuves
| Ticket | Titre | Dépend de | Issue |
|---|---|---|---|
| PF-08 | Schéma interactif du pipeline CI/CD | PF-05 | [#10](https://github.com/Rev0li/portfolio/issues/10) |
| PF-09 | Section IA & workflow | PF-02, PF-05 | [#11](https://github.com/Rev0li/portfolio/issues/11) |
| PF-10 | Fiches projets (dont teaser SongSurf) | PF-01, PF-05 | [#12](https://github.com/Rev0li/portfolio/issues/12) |
| PF-11 | Bandeau live | PF-05 | [#13](https://github.com/Rev0li/portfolio/issues/13) |

### Sprint 3 — Contact et mise en ligne
| Ticket | Titre | Dépend de | Issue |
|---|---|---|---|
| PF-12 | Formulaire de contact | PF-06 | [#14](https://github.com/Rev0li/portfolio/issues/14) |
| PF-13 | Finitions : SEO, partage, accessibilité, performance | PF-07 → PF-12 | [#15](https://github.com/Rev0li/portfolio/issues/15) |
| PF-15 | Navigation et scroll fluide (polish) | PF-16 | [#17](https://github.com/Rev0li/portfolio/issues/17) |
| PF-14 | Mise en production et retrait de l'ancien site Rust | PF-13, PF-15 | [#16](https://github.com/Rev0li/portfolio/issues/16) |

## Principe de découpage
- 1 ticket = une unité **livrable et testable** (pas un epic).
- Le statut de référence vit dans l'**issue** (ouverte, labels `status:*`, fermée par
  la PR) ; ce tableau ne décrit que le découpage et les dépendances.

## Jalons
- **Plan validé (fin phase 1) :** PF-01, PF-02, PF-03 validés par l'utilisateur.
- **Home (phase 2) :** PF-04 → PF-07 : la page existe en FR/EN avec le thème, sur MyCss v1.
- **v1 publique :** PF-08 → PF-14 : toutes les sections, contact fonctionnel, en prod sur le NAS.
- **Plus tard :** fusion dans le site unifié rev0auth, domaine pro, vitrine SongSurf interactive.
