const { connectToMongoDB, closeMongoDBConnection } = require('../config/db');
const Message = require("../entities/message.js");


module.exports.postMessage = async (req, res) => {
  const { forumId, userId, userName, text } = req.body;
  let db = null;

  if (!forumId || !userId || !userName || !text) {
    res.status(400).json({ message: "Requête invalide : Tous les champs doivent être remplit" });
    return;
  }

  try {
    db = await connectToMongoDB();
    const messages = new Message.default(db);

    await messages.create(forumId, userId, userName, text)
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

module.exports.getAllMessages = async (req, res) => {
  let db = null;

  try {
    db = await connectToMongoDB();
    const messages = new Message.default(db);

    await messages.getAll()
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

module.exports.getAllForumMessages = async (req, res) => {
  let db = null;
  // Récupère l'id passé en paramettre
  let forumId = req.params.id;

  try {
    db = await connectToMongoDB();
    const messages = new Message.default(db);

    await messages.getAllfromForum(forumId)
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

module.exports.getAllUserMessages = async (req, res) => {
  let db = null;
  // Récupère l'id passé en paramettre
  let userId = req.params.id;

  try {
    db = await connectToMongoDB();
    const messages = new Message.default(db);

    await messages.getAllfromUser(userId)
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

module.exports.messageInfo = async (req, res) => {
  let db = null;
  let messageId = req.params.id;

  try {
    db = await connectToMongoDB();
    const messages = new Message.default(db);

    await messages.get(messageId)
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

module.exports.deleteMessage = async (req, res) => {
  let db = null;
  // Récupère l'id passé en paramettre
  let messageId = req.params.id;

  try {
    db = await connectToMongoDB();
    const messages = new Message.default(db);

    // Si l'id du forum n'existe pas
    if(! await messages.existsId(messageId)) {
        res.status(400).json({ status: 400, message: "Erreur : ID inconnu :" + messageId });
        return;
    }

    await messages.delete(messageId)
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

module.exports.modifieMessage = async (req, res) => {
  let db = null;
  // Récupère l'id passé en paramettre
  let messageId = req.params.id;
  let { text } = req.body;

  try {
    db = await connectToMongoDB();
    const messages = new Message.default(db);

    // Si l'id du forum n'existe pas
    if(! await messages.existsId(messageId)) {
        res.status(400).json({ status: 400, message: "Erreur : ID inconnu :" + messageId });
        return;
    }

    await messages.modifie(messageId, text)
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
