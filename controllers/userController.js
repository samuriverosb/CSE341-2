const mongodb = require('../database');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

let userController = {};

userController.getUsers = (req, res) => {
  const result = mongodb.getDatabase().db('project2').collection('users').find()
  result.toArray()
    .then((users) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(users);
    })
    .catch((err) => {
      console.error('Error fetching users:', err);
      res.status(500).send('Internal Server Error');
    });
}

userController.getUserById = (req, res) => {
  const db = mongodb.getDatabase().db('project2');
  const userId = new ObjectId(req.params.id);
  db.collection('users').findOne({ _id: userId }).then((user) => {
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(user);
  }).catch((err) => {
    console.error('Error fetching user:', err);
    res.status(500).send('Internal Server Error');
  })
}

userController.createUser = async (req, res) => {
  try {
    const db = mongodb.getDatabase().db('project2');
    const { username, password, email, first_name, last_name, date_of_birth, favourite_games } = req.body;
    const existing = await db.collection('users').findOne({ username });
    if (existing) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword, email, first_name, last_name, date_of_birth, favourite_games };
    const result = await db.collection('users').insertOne(user);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(201).json({ _id: result.insertedId });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('Internal Server Error');
  }
}

userController.updateUser = (req, res) => {
  const db = mongodb.getDatabase().db('project2');
  const userId = new ObjectId(req.params.id);
  const { _id, ...updatedUser } = req.body;
  db.collection('users').updateOne({ _id: userId }, { $set: updatedUser }).then((result) => {
    if (result.matchedCount === 0) {
      return res.status(404).send('User not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send('User updated successfully');
  }).catch((err) => {
    console.error('Error updating user:', err);
    res.status(500).send('Internal Server Error');
  })
}

userController.deleteUser = (req, res) => {
  const db = mongodb.getDatabase().db('project2');
  const userId = new ObjectId(req.params.id);
  db.collection('users').deleteOne({ _id: userId }).then((result) => {
    if (result.deletedCount === 0) {
      return res.status(404).send('User not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send('User deleted successfully');
  }).catch((err) => {
    console.error('Error deleting user:', err);
    res.status(500).send('Internal Server Error');
  })
}

module.exports = userController;