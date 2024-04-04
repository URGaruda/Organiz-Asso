const { MongoClient } = require('mongodb');
const url = "mongodb+srv://axelCeresa:Hicko94!@cluster0.ird5nik.mongodb.net/Organiz-Asso";

let client = null;

// Fonction pour ouvrir la connexion à MongoDB
async function connectToMongoDB() {
  try {
    // Connection à MongoDB
    client = await MongoClient.connect(url);
    //console.log("Connected to MongoDB");

    // Renvoie l'instance du client
    return client.db('Organiz-Asso');
  } catch (err) {
    console.log("Failed to connect to MongoDB : ", err);
    throw err;
  }
}

// Fonction pour fermer la connexion à MongoDB
async function closeMongoDBConnection() {
    try {
        if (client) {
            await client.close();
            //console.log('Disconnected from MongoDB');
        }
    } catch (err) {
        console.error('Failed to disconect from MongoDB :', err);
        throw error;
    }
}

module.exports = { connectToMongoDB, closeMongoDBConnection };
