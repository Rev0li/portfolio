# 01 — Décisions techniques

Format ADR-lite : une entrée par décision structurante. On ne re-débat pas une
décision écrite ici sans ajouter une nouvelle entrée qui la remplace.

## Stack (résumé)
| Couche | Choix | Version |
|---|---|---|
| Langage(s) | TypeScript | 6.x (aligné rev0auth) |
| Framework(s) | SvelteKit + Svelte 5, adapter-node | Kit 2.57+, Svelte 5.55+ (aligné rev0auth) |
| i18n | Paraglide JS (inlang), FR + EN | dernière stable au moment de PF-06 |
| Style | MyCss v1 (`tokens.css`) + CSS du thème « System 7 / Aqua » | MyCss v1 (phase 2) |
| Base de données | Aucune en v1 | — |
| Infra / déploiement | Docker multi-stage (non-root, `read_only`) sur le NAS, port hôte 49154, reverse proxy + TLS sur le VPS via Tailscale | Node 22 |
| CI / tests | GitHub Actions : `svelte-check` + vitest + build image | — |

## Contraintes
- Self-hosted : NAS Synology + VPS OVH + Tailscale, comme aujourd'hui.
- Domaine actuel (duckdns) pendant les phases 1-2 ; domaine pro = question ouverte.
- Aucune donnée personnelle sensible en public (pas de téléphone, d'âge, de
  situation familiale, pas de photo).
- Confidentialité du stage (voir ADR-006).
- Workflow Git Collapse : issue → branche `feat/pf-xx` → commits
  `<type>(PF-xx): …` → PR → merge après validation.

---

## ADR-001 — Reconstruire en SvelteKit, abandonner Rust/Axum
- **Contexte :** besoin de FR/EN, d'un formulaire de contact, d'un bandeau de
  données live, et d'une fusion future dans le site unifié rev0auth (SvelteKit).
- **Décision :** le repo `~/dev/portfolio` repart de zéro en SvelteKit.
- **Pourquoi :** même stack que rev0auth, donc la fusion se fera en copiant des
  routes ; endpoints serveur natifs pour le contact et le live ; i18n mature.
- **Alternatives écartées :** garder Rust/Axum (i18n et fusion plus lourdes) ;
  coder directement dans rev0auth (mélange phase 1-2 et phase 3, casse l'ordre Collapse).
- **Conséquences :** le serveur Rust disparaît du working tree (reste dans
  l'historique git) et peut être cité comme projet passé.

## ADR-002 — Hébergement inchangé pendant les phases 1-2
- **Contexte :** l'infra NAS + VPS + Tailscale fonctionne déjà.
- **Décision :** même conteneur sur le NAS, même port hôte, même reverse proxy.
- **Pourquoi :** zéro risque infra pendant la refonte ; la page est elle-même
  une preuve que l'infra perso tourne.
- **Alternatives écartées :** acheter un domaine pro tout de suite (reporté).
- **Conséquences :** le passage à un domaine pro se fera au moment de la fusion.

## ADR-003 — Une page qui défile, habillée en fenêtres rétro
- **Contexte :** identité voulue : vieux PC (System 7) + touche Apple (Aqua),
  pastel, très pro. Cible prioritaire : recruteur non-tech.
- **Décision :** barre de menu fixe en haut (nom, langue, thème, horloge,
  statut live) ; chaque section est une « fenêtre » (barre de titre, boutons,
  ombre douce). **Pas de faux bureau à manipuler.** Sur mobile, les fenêtres
  s'empilent.
- **Pourquoi :** l'ambiance rétro sans coût d'usage : personne ne se demande où cliquer.
- **Alternatives écartées :** bureau interactif complet (fenêtres déplaçables) :
  fun pour un tech, perdant pour un RH et pénible sur mobile.
- **Conséquences :** composants `MenuBar` et `Window` au cœur du design ;
  palette rose pâle + turquoise de MyCss ; clair et sombre ; `prefers-reduced-motion` respecté.

## ADR-004 — Bilingue FR/EN avec Paraglide
- **Contexte :** cible France + recruteurs internationaux ; i18n déjà pratiquée
  en stage (refacto Java/Angular, extraction des textes en dur assistée par IA).
- **Décision :** aucun texte en dur dans les composants ; messages FR et EN ;
  sélecteur de langue dans la barre de menu ; FR par défaut.
- **Pourquoi :** cohérent avec le savoir-faire montré ; prépare la fusion.
- **Alternatives écartées :** FR seul ; deux pages dupliquées.
- **Conséquences :** l'EN doit être relu (rester simple et naturel).

## ADR-005 — Le DevOps du stage montré par un schéma, pas par une démo
- **Contexte :** le pipeline réel tourne en environnement pro sécurisé
  (VM d'entreprise, SUSE SLES 15, environnements dev → IAT → UAT → prod).
  Impossible et interdit de l'exposer.
- **Décision :** un **schéma interactif** (SVG + petites animations) qui
  vulgarise le parcours d'un changement : code → Bitbucket → Jenkins → image
  Docker → Helm / GitOps → Kubernetes (dev → IAT → UAT → prod), secrets via
  HashiCorp Vault, observabilité Prometheus + Grafana + Tempo. Au survol ou au
  clic, une phrase simple par étape.
- **Pourquoi :** le DevOps est plus parlant en graphe qu'en capture d'écran ;
  zéro risque de fuite.
- **Alternatives écartées :** captures d'écran (fuite possible) ; démo réelle (interdit).
- **Conséquences :** schéma générique, sans aucun nom de serveur, de projet ou d'URL interne.

## ADR-006 — Règles d'anonymisation du stage
- **Contexte :** stage de 6 mois (sept. 2026 → mars 2027) dans un éditeur de
  logiciels du secteur financier.
- **Décision :** on écrit : « éditeur de logiciels leader de son secteur,
  historiquement filiale d'un grand groupe bancaire, bureaux à Lyon Part-Dieu ».
  On ne cite **ni le nom, ni les clients, ni les projets internes** : ils sont
  décrits de façon générique (« une application métier critique »).
- **Pourquoi :** respecter la confidentialité tout en gardant le prestige.
- **Conséquences :** relire chaque texte « stage » avant publication (voir le
  risque de recoupement dans `03-scope.md`).

## ADR-007 — Le visiteur vient à moi
- **Contexte :** la page doit inspirer confiance, pas solliciter.
- **Décision :** pas de gros bouton « Embauchez-moi ». Un statut sobre dans le
  hero (« Disponible — CDI DevOps, mars 2027 ») et un contact complet en fin de
  page : GitHub, LinkedIn, mail (alias anonaddy), formulaire texte.
- **Conséquences :** le formulaire doit être fiable et anti-spam (honeypot +
  rate-limit, même approche que rev0auth).
