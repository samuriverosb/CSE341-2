const mongodb = require('../database');
const { ObjectId } = require('mongodb');

let gamesController = {};

gamesController.getGames = (req, res) => {
  const result = mongodb.getDatabase().db('project2').collection('games').find()
  result.toArray()
    .then((games) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(games);
    })
    .catch((err) => {
      console.error('Error fetching games:', err);
      res.status(500).send('Internal Server Error');
    });
}

gamesController.getGameById = (req, res) => {
  const db = mongodb.getDatabase().db('project2');
  const gameId = new ObjectId(req.params.id);
  db.collection('games').findOne({ _id: gameId }).then((game) => {
    if (!game) {
      return res.status(404).send('Game not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(game);
  }).catch((err) => {
    console.error('Error fetching game:', err);
    res.status(500).send('Internal Server Error');
  })
}

gamesController.createGame = (req, res) => {
  const db = mongodb.getDatabase().db('project2');
  const newGame = req.body;
  db.collection('games').insertOne(newGame).then((result) => {
    console.log(result);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(201).json({ _id: result.insertedId });
  }).catch((err) => {
    console.error('Error creating game:', err);
    res.status(500).send('Internal Server Error');
  })
}

gamesController.updateGame = (req, res) => {
  const db = mongodb.getDatabase().db('project2');
  const gameId = new ObjectId(req.params.id);
  const { _id, ...updatedGame } = req.body;
  db.collection('games').updateOne({ _id: gameId }, { $set: updatedGame }).then((result) => {
    if (result.matchedCount === 0) {
      return res.status(404).send('Game not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send('Game updated successfully');
  }).catch((err) => {
    console.error('Error updating game:', err);
    res.status(500).send('Internal Server Error');
  })
}

gamesController.deleteGame = (req, res) => {
  const db = mongodb.getDatabase().db('project2');
  const gameId = new ObjectId(req.params.id);
  db.collection('games').deleteOne({ _id: gameId }).then((result) => {
    if (result.deletedCount === 0) {
      return res.status(404).send('Game not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send('Game deleted successfully');
  }).catch((err) => {
    console.error('Error deleting game:', err);
    res.status(500).send('Internal Server Error');
  })
}

module.exports = gamesController;