const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongodb = require('../database');
// const { ObjectId } = require('mongodb');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || '1h';

const authController = {};

authController.register = async (req, res) => {
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
    res.status(201).json({ _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

authController.login = async (req, res) => {
  try {
    const db = mongodb.getDatabase().db('project2');
    const { username, password } = req.body;
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

authController.logout = (req, res) => {
  res.json({ message: 'Logged out' });
};

module.exports = authController;
