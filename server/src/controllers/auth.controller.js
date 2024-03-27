const session = require('express-session');
const { connectToMongoDB, closeMongoDBConnection } = require('../config/db');
const Users = require("../entities/users.js");

module.exports.register = async (req, res) => {
  const { login, password, lastname, firstname } = req.body;

  if (!login || !password || !lastname || !firstname) {
    res.status(400).json({ status: 400, message: "Requête invalide : Tous les champs doivent être remplit" });
    return;
  }

  let db = null;

  try {
    db = await connectToMongoDB();
    db_users = await db.collection("users");
    const users = new Users.default(db_users);

    // Check si le login est déjà utilisé
    await users.existsLogin(login)
      // Si c'est le cas, renvoi une erreur
      .then((rep) => res.status(409).json(rep))
      // Sinon on creer le user
      .catch(async (err) => {
        if (err.status == 400){
          await users.create(login, password, lastname, firstname)
            .then((rep) => res.status(201).send(rep))
            .catch((err) => res.status(500).send(err));
        } else {
          res.status(err.status).json(err)
        }
      });

  } catch (err) {
    // Toute autre erreur
    res.status(500).json({
        message: "Erreur interne",
        details: (err || "Erreur inconnue").toString()
    });
  } finally {
    // Assure la fermeture de la connexion à MongoDB après utilisation
    if (db) {
      await closeMongoDBConnection();
    }
  }
};

module.exports.login = async (req, res) => {
  const { login, password } = req.body;

  let db = null;

  try {
      db = await connectToMongoDB();
      db_users = await db.collection("users");
      const users = new Users.default(db_users);

      // Erreur sur la requête HTTP
      if (!login || !password) {
          res.status(400).json({ status: 400, message: "Requête invalide : login et password nécessaires" });
          return;
      }

      console.log('Checking password ...');
      await users.checkpassword(login, password)
        .then(async (rep) => {
          req.session.userid = rep
          await req.session.save();
          res.status(200).json({ status: 200, message: "Login et mot de passe accepté" });
        })
        .catch((err) => {
          if (err.status == 403) {
            req.session.destroy((err) => { });
            res.status(403).json(err);
          } else {
            res.status(500).json(err);
          }
        });

  } catch (err) {
      // Toute autre erreur
      res.status(500).json({
          message: "Erreur interne",
          details: (err || "Erreur inconnue").toString()
      });
  } finally {
    if (db){
      await closeMongoDBConnection();
    }
  }
};

module.exports.logout = async (req, res) => {
  try {
    // Vérifie si l'utilisateur est connecté
    if (req.session && req.session.userid){
      // Détruit la session de l'utilisateur pour le déconnecter
      req.session.destroy((err) => {
        if (err) {
          console.log('Erreur lors de la déconnection : ', err);
          res.status(500).json({ status: 500, message: "Erreur interne lors de la déconnection" });
        } else {
          res.cookie('usid', '', { maxAge: 1 });
          res.status(200).json({ status: 200, message: "Déconnection effectuée" })
        }
      });
    } else {
      // Si l'utilisateur n'est pas connecté, renvoyer une Erreur
      res.cookie('usid', '', { maxAge: 1 });
      res.status(401).json({ status: 401, message: "Vous n'êtes pas connecté" });
    }

  } catch (err) {
    // Toute autre erreur
    res.status(500).json({
        message: "Erreur interne",
        details: (err || "Erreur inconnue").toString()
    });
  }
};
