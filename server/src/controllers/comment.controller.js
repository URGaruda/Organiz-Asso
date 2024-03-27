const { connectToMongoDB, closeMongoDBConnection } = require('../config/db');
const Comment = require("../entities/comment.js");


module.exports.postComment = async (req, res) => {
  const { messageId, userId, userName, text } = req.body;
  let db = null;

  if (!messageId || !userId || !userName || !text) {
    res.status(400).json({ message: "Requête invalide : Tous les champs doivent être remplit" });
    return;
  }

  try {
    db = await connectToMongoDB();
    const db_comments = db.collection('comments');
    const comments = new Comment.default(db_comments);

    await comments.create(messageId, userId, userName, text)
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

module.exports.getAllMessagesComments = async (req, res) => {
  let db = null;
  let messageId = req.params.id;

  try {
    db = await connectToMongoDB();
    const db_comments = db.collection('comments');
    const comments = new Comment.default(db_comments);

    await comments.getAllfromMessage(messageId)
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

module.exports.commentInfo = async (req, res) => {
  let db = null;
  let commentId = req.params.id;

  try {
    db = await connectToMongoDB();
    const db_comments = db.collection('comments');
    const comments = new Comment.default(db_comments);

    await comments.get(commentId)
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

module.exports.deleteComment = async (req, res) => {
  let db = null;
  // Récupère l'id passé en paramettre
  let commentId = req.params.id;

  try {
    db = await connectToMongoDB();
    const db_comments = db.collection('comments');
    const comments = new Comment.default(db_comments);

    // Si l'id du forum n'existe pas
    if(! await comments.existsId(commentId)) {
        res.status(400).json({ status: 400, message: "Erreur : ID inconnu :" + commentId });
        return;
    }

    await comments.delete(commentId)
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

module.exports.modifieComment = async (req, res) => {
  let db = null;
  // Récupère l'id passé en paramettre
  let commentId = req.params.id;
  let { text } = req.body;

  try {
    db = await connectToMongoDB();
    const db_comments = db.collection('comments');
    const comments = new Comment.default(db_comments);

    // Si l'id du forum n'existe pas
    if(! await comments.existsId(commentId)) {
        res.status(400).json({ status: 400, message: "Erreur : ID inconnu :" + commentId });
        return;
    }

    await comments.modifie(commentId, text)
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
