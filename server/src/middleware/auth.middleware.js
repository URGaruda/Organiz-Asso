const { connectToMongoDB, closeMongoDBConnection } = require('../config/db');
const Users = require("../entities/users.js");

module.exports.checkUser = async (req, res, next) => {
  let db = null;
  try {
    // Vérifie si l'utilisateur est connecté en vérifiant la présence de req.session.user
    if (req.session.userid) {
      // Se connecte à la BD
      db = await connectToMongoDB();
      const db_users = await db.collection("users");
      const users = new Users.default(db_users);

      let user = await users.get(req.session.userid);
      res.locals.user = user;
      console.log(req.session.userid);
      next();

    } else {
      // Si l'utilisateur n'est pas connect
      console.log('pas de session');
      res.locals.user = null
      res.cookie('usid', '', { maxAge: 1 });
      next();
    }
  } catch (err) {
    // En cas d'erreur, renvoie une erreur interne
    res.status(500).json({
      message: "Erreur interne",
      details: (err || "Erreur inconnue").toString()
    });
  } finally {
    if (db) {
      await closeMongoDBConnection();
    }
  }
};


module.exports.requireAuth = async (req, res, next) => {
  try {
    // Vérifie si l'utilisateur est connecté en vérifiant la présence de req.session.user
    if (req.session.userid) {
      console.log(req.session.userid);
      next();
    } else {
      console.log('Not connected');
      res.status(401).json({ status: 401, message: 'Erreur : Utilisateur non authentifié' })
    }
  } catch (err) {
    // En cas d'erreur, renvoie une erreur interne
    res.status(500).json({
      message: "Erreur interne",
      details: (err || "Erreur inconnue").toString()
    });
  }
};
