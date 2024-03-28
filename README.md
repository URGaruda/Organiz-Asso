# Organiz-Asso

Projet de l'UE LU3IN017 - Technologies du Web. Frontend en React et Backend en NodeJs avec express.

## Installation

Une fois les fichiers téléchargés, dans un terminal faire un `npm install` dans le répertoire `/server` et dans le répertoire `/client` pour installer les dépendences nécéssaires (création du dossier `/node_modules`).

1. **Base de donnée :** Pour relier la base de donnée au backend, modifier coté server dans le fichier `app.js` la ligne 42 `mongoUrl: "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.ird5nik.mongodb.net/Organiz-Asso"` par le lien de la base MongoDB hébergé localement généralement `mongodb://localhost:27017` (à confirmer). De même dans le fichier `/config/db.js` modifier la ligne 2 avec l'url de la DB local. Le logiciel MongoDB Compass permet de visualiser graphiquement l'état de la base de données et d'y effectuer des modification sans utiliser les lignes de commandes.
   
2.  **Postman :** L'utilisation de Postaman est recommandé pour tester les requêtes au serveur.

## BACKEND

### Architecture des fichiers :
Dans le dossier `/server` se trouve tous les fichiers réalisant le backend de notre application le point d'entré est `index.js`, `app.js` lance le server et fait appel à `api.js` qui gère toutes les routes de notre backend.
1. **`/config` :** Contient le fichier `db.js` qui définie les fonctions utilisées dans notre application pour se connecter et se déconnecter à la base de données. Elle sont appelées dans les fichiers `x.controller.js`.
2. **`/controllers` :** Contient les fichiers définissant toutes les actions possibles sur notre base de données appelé en callback des différentes routes de notre application. Chaque fichier correspond aux fonctions liées à une entité spécifique (ex: user, forum, message, etc...). Ces fonctions font appels aux méthodes des classes définis dans les fichiers de `/entities`.
3. **`/entities` :** Contient les fichiers définissant les classes de chaque entitiés de notre application (user, forum, message, comment). Les méthodes déffinis dans ses classes effectue les requêtes auprès de la base de données MongoDB donnée en paramètres.
4. **`/middleware` :** Contient les middlewares 'checkUser' et `requireAuth` utilisés à la racine de notre server pour sécuriser les requêtes et restreindres leur accès uniquement à un utilisateur connécté (dont une session express à été créée).
5. **`/routes` :** Contient les fichiers deffinissant les routes des requêtes server de notre application pour chaque famille de services.

## FRONTEND

### Architecture des fichiers :
