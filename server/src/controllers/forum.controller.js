const { connectToMongoDB, closeMongoDBConnection } = require('../config/db');
const Forums = require("../entities/forum.js");


module.exports.createForum = async (req, res) => {
  const { name, acces } = req.body;
  let db = null;

  if (!name || !acces) {
    res.status(400).json({ message: "Requête invalide : Tous les champs doivent être remplit" });
    return;
  }

  try {
    db = await connectToMongoDB();
    const db_forums = await db.collection("forums");
    const forums = new Forums.default(db_forums);

    if(await forums.existsName(name)) {
      res.status(409).json({ status: 409, message: "Erreur : Nom déjà utilisé" })
      return;
    }

    await forums.create(name, acces)
      .then((rep) => res.status(201).send(rep))
      .catch((err) => res.status(500).send(err));

  } catch (err) {
    // Toute autre erreur
    res.status(500).json({
        message: "Erreur interne",
        details: (err || "Erreur inconnue").toString()
    });
  } finally {
    if (db) {
      await closeMongoDBConnection();
    }
  }
}

module.exports.getAllForums = async (req, res) => {
  let db = null;

  try {
    db = await connectToMongoDB();
    const db_forums = await db.collection("forums");
    const forums = new Forums.default(db_forums);

    // Récuprère la liste des forums
    await forums.getAll()
      .then((rep) => res.status(200).json(rep))
      .catch((err) => res.status(err.status).json(err));

  } catch (err) {
    // Toute autre erreur
    res.status(500).json({
        message: "Erreur interne",
        details: (err || "Erreur inconnue").toString()
    });
  } finally {
    if (db) {
      await closeMongoDBConnection();
    }
  }
}

module.exports.forumInfos = async (req, res) => {
  let db = null;
  // Récupère l'id passé en paramettre
  let forumid = req.params.id;

  try {
    db = await connectToMongoDB();
    const db_forums = await db.collection("forums");
    const forums = new Forums.default(db_forums);

    // Si l'id du forum n'existe pas
    if(! await forums.existsId(forumid)) {
        res.status(400).json({ status: 400, message: "ID inconnu :" + forumid });
        return;
    }

    // Id correct
    await forums.get(forumid)
      .then((rep) => res.status(200).json(rep))
      .catch((err) => res.status(err.status).json(err));

  } catch (err) {
    // Toute autre erreur
    res.status(500).json({
        message: "Erreur interne",
        details: (err || "Erreur inconnue").toString()
    });
  } finally {
    if (db) {
      await closeMongoDBConnection();
    }
  }
}

module.exports.deleteForum = async (req, res) => {
  let db = null;
  // Récupère l'id passé en paramettre
  let forumid = req.params.id;

  try {
    db = await connectToMongoDB();
    const db_forums = await db.collection("forums");
    const forums = new Forums.default(db_forums);

    // Si l'id du forum n'existe pas
    if(! await forums.existsId(forumid)) {
        res.status(400).json({ status: 400, message: "Erreur : ID inconnu :" + forumid });
        return;
    }

    await forums.delete(forumid)
      .then((rep) => res.status(200).json(rep))
      .catch((err) => res.status(err.status).json(err));

  } catch (err) {
    // Toute autre erreur
    res.status(500).json({
        message: "Erreur interne",
        details: (err || "Erreur inconnue").toString()
    });
  } finally {
    if (db) {
      await closeMongoDBConnection();
    }
  }
}

module.exports.changeName = async (req, res) => {
  let db = null;
  // Récupère l'id passé en paramettre
  let forumid = req.params.id;
  let { name } = req.body;

  try {
    db = await connectToMongoDB();
    const db_forums = await db.collection("forums");
    const forums = new Forums.default(db_forums);

    // Si l'id du forum n'existe pas
    if(! await forums.existsId(forumid)) {
        res.status(400).json({ status: 400, message: "Erreur : ID inconnu :" + forumid });
        return;
    }

    // Change le nom du forum dans la bd
    await forums.changeName(forumid, name)
      .then((rep) => res.status(200).json(rep))
      .catch((err) => res.status(err.status).json(err));

  } catch (err) {
    // Toute autre erreur
    res.status(500).json({
        message: "Erreur interne",
        details: (err || "Erreur inconnue").toString()
    });
  } finally {
    if (db) {
      await closeMongoDBConnection();
    }
  }
}

module.exports.changeAcces = async (req, res) => {
  let db = null;
  // Récupère l'id passé en paramettre
  let forumid = req.params.id;
  let { acces } = req.body;

  try {
    db = await connectToMongoDB();
    const db_forums = await db.collection("forums");
    const forums = new Forums.default(db_forums);

    // Si l'id du user n'existe pas
    if(! await forums.existsId(forumid)) {
        res.status(400).json({ status: 400, message: "Erreur : ID inconnu :" + forumid });
        return;
    }

    // Change le nom du forum dans la bd
    await forums.changeAcces(forumid, acces)
      .then((rep) => res.status(200).json(rep))
      .catch((err) => res.status(err.status).json(err));

  } catch (err) {
    // Toute autre erreur
    res.status(500).json({
        message: "Erreur interne",
        details: (err || "Erreur inconnue").toString()
    });
  } finally {
    if (db) {
      await closeMongoDBConnection();
    }
  }
}
