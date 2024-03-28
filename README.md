# Organiz-Asso

Projet de l'UE LU3IN017 - Technologies du Web.  
Frontend en React et Backend en NodeJs avec express.  
Base de données avec MongoDB.

## Installation

Une fois les fichiers téléchargés, dans un terminal faire un `npm install` dans le répertoire `/server` et dans le répertoire `/client` pour installer les dépendences nécéssaires (création du dossier `/node_modules`).

1. **Base de donnée :** Pour relier la base de donnée au backend, modifier coté server dans le fichier `app.js` la ligne 42 `mongoUrl: "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.ird5nik.mongodb.net/Organiz-Asso"` par le lien de la base MongoDB hébergé localement généralement `mongodb://localhost:27017` (à confirmer). De même dans le fichier `/config/db.js` modifier la ligne 2 avec l'url de la DB local. Le logiciel MongoDB Compass permet de visualiser graphiquement l'état de la base de données et d'y effectuer des modification sans utiliser les lignes de commandes.
   
2.  **Postman :** L'utilisation de Postaman est recommandé pour tester les requêtes au serveur.


## BACKEND

### Architecture des fichiers :
Dans le dossier `/server` se trouve tous les fichiers réalisant le backend de notre application le point d'entré est `index.js`, `app.js` lance le server et fait appel à `api.js` qui gère toutes les routes de notre backend.
1. **`/config` :** Contient le fichier `db.js` qui définie les fonctions utilisées dans notre application pour se connecter et se déconnecter de la base de données. Elle sont appelées dans les fichiers `x.controller.js`. Contient aussi le fichier `.env` pour sécuriser certaines variables.
2. **`/controllers` :** Contient les fichiers définissant toutes les actions possibles sur notre base de données appelé en callback des différentes routes de notre application. Chaque fichier correspond aux fonctions liées à une entité spécifique (ex: user, forum, message, etc...). Ces fonctions font appels aux méthodes des classes définis dans les fichiers de `/entities`.
3. **`/entities` :** Contient les fichiers définissant les classes de chaque entitiés de notre application (user, forum, message, comment). Les méthodes déffinis dans ses classes effectue les requêtes auprès de la base de données MongoDB donnée en paramètres.
4. **`/middleware` :** Contient les middlewares `checkUser` et `requireAuth` utilisés à la racine de notre server pour sécuriser les requêtes et restreindres leur accès uniquement à un utilisateur connécté (dont une session express à été créée).
5. **`/routes` :** Contient les fichiers deffinissant les routes des requêtes server de notre application pour chaque famille de services.


## FRONTEND

### Architecture des fichiers :
Dans le dossier `/client` se trouve tous les fichiers réalisant le frontend de notre application le point d'entré est `index.js`, qui fait appel au composant `<App/>` qui gères le routage de notre application avec 'react-router-dom'.
1. **`/public` :** Contient le fichier `index.html` dans lequel est fait le render des composants react de l'application.
2. **`/assets/img` :** Contient les images temporairement utilisées dans l'application.
3. **`/components` :** Contient les fichiers définissant les différents composants appelés dans les pages de notre application react. Ces composants disposent chacun de leur fichier CSS correspondant. `AppContext.js` est le composant englobant toute notre application et permet de stocker dans une variable accessible dans tout nos composant l'id de session de l'utilisateur connecté. 
4. **`/config` :** Contient le fichier `.env` pour sécuriser certaines variables.
5. **`/pages` :** Contient les fichiers deffinissant les composants des pages de l'application, chacune d'elles appellent les composants définis dans le dossier `/components`.


## BASE DE DONNÉES
La base de données est définit grâce à MongoDB.

### Définition des collections :

**users** : 
```json
{
   "_id" : "objectId('6602f45a954659e97353c359')",
   "login" : "DupondDupond",
   "password" : "$2b$10$qrhcNl.GR7xjWya/Btjp6.L4FFxiR.xpXAq0wkrWjstyb2UtQLnp.",
   "lastname" : "Dupond",
   "firsname" : "Dupond",
   "status" : "member"
}
```
Avec les champs _id de type `ObjectId` (généré automatiquement lors de l'ajout d'un document dans la base de donnée) et login, password, lastname, firsname, status, de type `String`.  
A savoir que le password est cryté à l'aide de la bibliothèque `bcrypt` avant l'ajout dans la base de données.  Le status s'un user est initialisé de base à "member".

**forums** : 
```json
{
   "_id" : "objectId('6602f9c2391f27f96e5f84e4')",
   "name" : "Forum membres",
   "acces" : [ "member", "admin" ]
}
```
Avec les champs _id de type `ObjectId`, name de type `String` et acces une liste de `String`.  Acces définit les status de user pouvant voir et ecrire dans le forum.  

**messages** : 
```json
{
   "_id" : "objectId('6602f45a954659e97353c359')",
   "login" : "DupondDupond",
   "password" : "$2b$10$qrhcNl.GR7xjWya/Btjp6.L4FFxiR.xpXAq0wkrWjstyb2UtQLnp.",
   "lastname" : "Dupond",
   "firsname" : "Dupond"
}
```
**comment** : 
```json
{
   "_id" : "objectId('6602f45a954659e97353c359')",
   "login" : "DupondDupond",
   "password" : "$2b$10$qrhcNl.GR7xjWya/Btjp6.L4FFxiR.xpXAq0wkrWjstyb2UtQLnp.",
   "lastname" : "Dupond",
   "firsname" : "Dupond"
}
```
**sessions** :
```json
{
   "_id" : "objectId('6602f45a954659e97353c359')",
   "login" : "DupondDupond",
   "password" : "$2b$10$qrhcNl.GR7xjWya/Btjp6.L4FFxiR.xpXAq0wkrWjstyb2UtQLnp.",
   "lastname" : "Dupond",
   "firsname" : "Dupond"
}
```


## Lancement
