# tdapi

TD API avec Node.js

## Installation des dépendances
Depuis la racine du projet :
```bash
npm install
```
Ce projet nécessite également l'installation de MariaDB.
## Configuration
Modifiez le fichier d'environnement `.env` et remplissez les informations (connexion DB, port, etc.).

## Démarrage (développement)
Le projet utilise nodemon. Démarrez l'application avec :
```bash
nodemon start
```

## Routes
Les routes sont définies dans `user.routes.ts`. Voici les 5 routes définies :

- GET /users
  - Récupère la liste des utilisateurs.

- GET /users/:id
  - Récupère un utilisateur par son identifiant.
  - Paramètres : id (dans l'URL).

- POST /users
  - Crée un nouvel utilisateur.
  - Corps (JSON) : objet utilisateur avec les champs requis (voir validation dans le code).

- PUT /users/:id
  - Met à jour un utilisateur existant.
  - Paramètres : id (dans l'URL).
  - Corps (JSON) : champs à mettre à jour (doit contenir les champs nom et email).

- DELETE /users/:id
  - Supprime un utilisateur par son identifiant.
  - Paramètres : id (dans l'URL).

## Structure de la base de données
La base de données `tdapi` contient une table `users` avec les colonnes suivantes :

- id : identifiant unique (clé primaire)
- name : nom de l'utilisateur
- email : adresse email de l'utilisateur

Elle est créée automatiquement au premier démarrage de l'API (si MariaDB est correctement installé et les informations de connexions sont renseignées dans le fichier .env).
