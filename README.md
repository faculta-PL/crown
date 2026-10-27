# Protect Your Crown Beauty.Co

Site vitrine bilingue (EN / FR) pour la maison de coiffure afro **Protect Your Crown Beauty.Co** — tressage africain, soins 4C et huiles botaniques.

## Structure

```
├── index.html          # Page principale (SPA)
├── css/styles.css      # Styles éditoriaux
├── js/
│   ├── tailwind.config.js
│   ├── i18n.js         # Dictionnaire EN / FR
│   ├── data.js         # Prestations & produits
│   └── app.js          # Navigation, panier, formulaires
├── assets/favicon.svg
├── package.json
├── robots.txt
└── sitemap.xml
```

## Lancer en local

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

Puis ouvrir [http://localhost:3000](http://localhost:3000).

Avec Node (si installé) : `npm start`

## Fonctionnalités

- Navigation SPA avec hash (`#accueil`, `#prestations`, …)
- Bilingue EN-US / FR avec mémorisation
- Panier persistant (localStorage)
- Demande de rendez-vous & formulaires contact / commande
- Bannière cookies mémorisée
