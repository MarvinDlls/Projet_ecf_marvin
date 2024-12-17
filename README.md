# Projet de Recettes

Ce projet est une application web permettant de gérer des recettes. Il est divisé en deux parties : un front-end développé avec React et un back-end Node.js.

## Installation

### Front-end

1. Cloner le repository du projet.
2. Naviguer dans le dossier contenant le front-end.
   ```bash
   cd front
   ```
3. Installer les dépendances avec npm :
   ```bash
   npm install
   ```
4. Lancer l'application front-end :
   ```bash
   npm run dev
   ```

### Back-end

1. Naviguer dans le dossier `back` contenant le back-end via ce repo GitHub [ici](https://github.com/MarvinDlls/back.git).   ```bash
   cd back
   ```
2. Installer les dépendances avec npm :
   ```bash
   npm install
   ```
3. Lancer le serveur :
   ```bash
   node index.js
   ```

## Fonctionnalités

### Développement Front-end
- **React Router DOM** : Le projet utilise React Router DOM pour la gestion des routes.
- **Fichier `App.jsx`** : Il sert de point central pour gérer les différentes routes de l'application.
- **Pages créées** :
  - `Home` : La page d'accueil.
  - `Favoris` : Une page pour afficher les recettes favorites.
  - `Détails` : Une page pour afficher les détails d'une recette spécifique.
- **Composants principaux** :
  - `Modal` : Permet d'afficher des informations supplémentaires ou des actions sur les recettes.
  - `Navbar` : Une barre de navigation pour se déplacer entre les pages.
  - `Icon` : Des icônes pour ajouter ou supprimer des recettes des favoris.
- **Gestion des données** :
  - Les appels à l'API sont centralisés dans un dossier dédié pour faciliter leur réutilisation sur les différentes pages.

### Développement Back-end
- Un serveur Node.js permettant de fournir les données nécessaires au front-end via une API.

## Déploiement

### Front-end
Le front-end a été déployé sur [Vercel](https://vercel.com/) pour assurer une mise en ligne rapide et accessible.

### Back-end
Le back-end a également été déployé sur Vercel. L'URL du back-end a été configurée dans le front-end pour permettre à ce dernier de communiquer avec l'API en ligne.

## Accès au Projet
- **Front-end** : [Lien vers le site](https://projet-ecf-marvin.vercel.app/)
- **Back-end** : [Lien vers l'API](https://back-eynq.vercel.app/api/infos/).

---

Ce projet est conçu pour être facilement extensible et maintenable. N'hésitez pas à proposer des améliorations ou des suggestions !