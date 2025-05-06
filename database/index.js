const dotenv = require('dotenv').config();

const mongoClient = require('mongodb').MongoClient;

let database;

const initDatabase = (callback) => {
  if (database) {
    return callback(null, database);
  }
  mongoClient.connect(process.env.MONGODB_CONNECTION_STRING)
  .then((client) => {
    database = client;
    callback(null, database);
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
    callback(err, null);
  });
}

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized. Call initDatabase first.');
  }
  return database;
}

module.exports = { initDatabase, getDatabase };