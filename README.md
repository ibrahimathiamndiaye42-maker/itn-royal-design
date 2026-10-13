# ITN Royal Design

Boutique en ligne (React, Vite, Tailwind, React Router). Les clients choisissent un modèle, une couleur et une taille, puis envoient leur commande sur WhatsApp. Il n'y a ni compte client ni serveur : le panier et les favoris restent sur l'appareil du visiteur.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # site prêt à publier dans /dist
npm run preview    # tester le build
```

## À régler avant la mise en ligne

1. **Prix** : `src/data/prices.js`. Les montants fournis sont provisoires, à remplacer par vos vrais prix. Ensuite, passez `pricesConfirmed` à `true` dans `src/config/site.js` (le rappel orange du mode développement disparaît).
2. **WhatsApp et contacts** : `src/config/site.js` (`contact.whatsapp` au format `221XXXXXXXXX`, e-mail, réseaux sociaux : laissez vide pour masquer).
3. **Tailles** : `sizes` de chaque produit dans `src/data/products.js` (`[]` supprime le sélecteur).
4. **Textes livraison, paiement, échanges** : `info` dans `src/config/site.js`. Ils ne promettent aucun délai : remplacez-les par vos conditions réelles.
5. **Noms et descriptions** des produits : `src/data/products.js`.

## Où modifier quoi

| Je veux… | Fichier |
| --- | --- |
| changer un prix | `src/data/prices.js` |
| renommer un produit, un coloris, ajouter une taille | `src/data/products.js` |
| changer le numéro WhatsApp, le nom, les liens du menu | `src/config/site.js` |
| modifier les catégories et leur photo de couverture | `src/data/categories.js` |
| modifier les familles de couleurs du filtre | `src/data/colors.js` |
| changer les couleurs et polices du site | `tailwind.config.js` et `src/index.css` |
| choisir les produits de la page d'accueil | `FEATURED` dans `src/pages/Home.jsx` et `HERO_SLUG` dans `src/sections/Hero.jsx` |

## Ajouter un produit

1. `python scripts/optimize_images.py <dossier_photos> <slug>` crée les images WebP et affiche les lignes pour `src/data/imageMeta.js`.
2. Ajoutez le produit dans `src/data/products.js` (un coloris = une entrée dans `variants`, avec les numéros de photos `images: ["00"]`).
3. Ajoutez son prix dans `src/data/prices.js`.

## Paiements en ligne (plus tard)

`src/config/payments.js` liste Wave, Orange Money, Free Money et carte, désactivés. Pour en activer un : mettez `enabled: true` et ajoutez son traitement dans `src/services/orders.js`. Le reste du site n'a pas à changer.

## Publication

Le dossier `dist` est un site statique. Vercel et Netlify fonctionnent tels quels (`vercel.json` et `public/_redirects` gèrent les liens directs vers les pages).

## Fonctions principales

Filtre et pastilles par couleur sur toute la boutique, changement de photo au clic sur un coloris, filtres partageables par lien, recherche instantanée, favoris, derniers produits vus, panier persistant, message WhatsApp pré-rempli, partage d'un produit, barre de navigation mobile, accessibilité clavier et lecteurs d'écran, respect de « réduire les animations ».
