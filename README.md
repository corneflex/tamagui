# 🛒 Supermarché Product Explorer

Ce projet est une application web et mobile (Next.js + Expo) permettant de lister et explorer des articles de supermarché (produits alimentaires) à partir de l'API publique [OpenFoodFacts](https://world.openfoodfacts.org/api/v2).

## Fonctionnalités principales

- **Liste de produits** : Affichage performant (grille virtuelle) de produits alimentaires issus de l'API OpenFoodFacts.
- **Scroll infini** : Chargement automatique de nouveaux produits lors du scroll.
- **Navigation** : Accès à la fiche détaillée de chaque produit.
- **UI cross-platform** : Interface unifiée web/mobile grâce à Tamagui.

## Stack technique

- **Next.js** (web)
- **Expo** (mobile)
- **Tamagui** (UI cross-platform)
- **SWR** (fetching, cache, pagination)
- **RecyclerListView** (grille performante)
- **OpenFoodFacts API** (source des données)

## Tamagui & Solito : cross-platform natif

- **Tamagui** est une librairie UI React qui permet d'écrire des composants réutilisables et performants, avec un rendu natif sur web **et** mobile (React Native). Elle gère le style, la responsivité, et l'accessibilité de façon unifiée.
- **Solito** permet de partager la navigation et la logique de routing entre Next.js (web) et React Navigation (mobile), en gardant une API commune. On écrit une seule fois la navigation (liens, routes, navigation stack) et elle fonctionne sur toutes les plateformes.
- **Approche cross-platform** :
  - Les écrans, composants et hooks sont partagés entre web et mobile.
  - La navigation (liens, navigation stack, deep linking) est abstraite : un `<Link>` ou un `useLink` fonctionne aussi bien sur Next.js (web) que sur Expo (mobile), sans code spécifique à chaque plateforme.
  - Résultat : une base de code unique, une UX cohérente, et un vrai partage de logique métier et UI.

## Structure du monorepo

- `apps/next` : Application web (Next.js)
- `apps/expo` : Application mobile (Expo)
- `packages/app` : Logique métier, hooks, features partagés
- `packages/ui` : UI kit custom optimisé Tamagui

## Démarrage rapide

```sh
yarn # installe les dépendances

yarn web # démarre l'app web (Next.js)

yarn native # démarre l'app mobile (Expo)
```

## Exemple d'API utilisée

Les produits sont récupérés via l'API publique OpenFoodFacts :

```
GET https://world.openfoodfacts.org/api/v2/search?page=1&page_size=50&fields=product_name,brands,images
```

## Pour contribuer

- Ajoute tes features dans `packages/app/features`.
- Les composants UI partagés vont dans `packages/ui`.
- Les hooks d'accès API sont dans `packages/app/features/products/hooks`.

## À propos

Ce projet est basé sur le starter Tamagui/Solito, mais va plus loin : il propose une vraie exploration de produits alimentaires, avec une stack moderne et une UX fluide.

---

*Fork de l'architecture [Solito](https://solito.dev) adaptée à un cas d'usage concret.*
