const mongodb = require('../database');
const { ObjectId } = require('mongodb');

let contactController = {};

contactController.getContacts = (req, res) => {
  const result = mongodb.getDatabase().db('contactsproject').collection('contacts').find()
  result.toArray()
    .then((contacts) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(contacts);
    })
    .catch((err) => {
      console.error('Error fetching contacts:', err);
      res.status(500).send('Internal Server Error');
    });
}

contactController.getContactById = (req, res) => {
  const db = mongodb.getDatabase().db('contactsproject');
  const contactId = new ObjectId(req.params.id);
  db.collection('contacts').findOne({ _id: contactId }).then((contact) => {
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(contact);
  }).catch((err) => {
    console.error('Error fetching contact:', err);
    res.status(500).send('Internal Server Error');
  })
}

module.exports = contactController;