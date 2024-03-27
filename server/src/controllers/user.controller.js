const { connectToMongoDB, closeMongoDBConnection } = require('../config/db');
const Users = require("../entities/users.js");


module.exports.getAllUsers = async (req, res) => {
  let db = null;
  try {
    db = await connectToMongoDB();
    db_users = await db.collection("users");
    const users = new Users.default(db_users);

    // Récuprère la liste des users
    await users.getAll()
      .then((rep) => res.status(200).json(rep))
      .catch((err) => res.status(500).json(err))

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
}

module.exports.userInfos = async (req, res) => {
  // Récupère l'id passé en paramettre
  let userID = req.params.id;
  let db = null;

  try {
    db = await connectToMongoDB();
    const db_users = await db.collection('users');
    const users = new Users.default(db_users);

    // Check si le user existe
    await users.existsId(userID)
      // Transmet les infos du user
      .then(async (rep) => {
        await users.get(userID)
          .then((rep) => res.status(200).json(rep))
          .catch((err) => res.status(err.status).json(err));
      })
      .catch((err) => res.status(err.status).json(err));

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
}

module.exports.deleteUser = async (req, res) => {
  // Récupère l'id passé en paramettre
  let userID = req.params.id;
  let db = null;

  try {
    db = await connectToMongoDB();
    const db_users = await db.collection("users");
    const users = new Users.default(db_users);

    // Check si le user existe
    await users.existsId(userID)
      // Delete le user
      .then(async (rep) => {
        await users.delete(userID)
          .then((rep) => res.status(200).json(rep))
          .catch((err) => res.status(err.status).json(err));
      })
      .catch((err) => res.status(err.status).json(err));

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
}

module.exports.switchUserStatus = async (req, res) => {
  // Récupère l'id passé en paramettre
  let userID = req.params.id;
  let db = null;

  try {
    db = await connectToMongoDB();
    const db_users = await db.collection('users');
    const users = new Users.default(db_users);

    // Check si le user existe
    await users.existsId(userID)
      .then(async (rep) => {
        // Change le status du user dans la bd
        await users.switchStatus(userID)
          .then((rep) => res.status(200).json(rep))
      })
      .catch((err) => res.status(err.status).json(err));

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
}
