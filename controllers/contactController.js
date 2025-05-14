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

contactController.createContact = (req, res) => {
  const db = mongodb.getDatabase().db('contactsproject');
  const newContact = req.body;
  db.collection('contacts').insertOne(newContact).then((result) => {
    console.log(result);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(201).json({ _id: result.insertedId });
  }).catch((err) => {
    console.error('Error creating contact:', err);
    res.status(500).send('Internal Server Error');
  })
}

contactController.updateContact = (req, res) => {
  const db = mongodb.getDatabase().db('contactsproject');
  const contactId = new ObjectId(req.params.id);
  const updatedContact = req.body;
  db.collection('contacts').updateOne({ _id: contactId }, { $set: updatedContact }).then((result) => {
    if (result.matchedCount === 0) {
      return res.status(404).send('Contact not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send('Contact updated successfully');
  }).catch((err) => {
    console.error('Error updating contact:', err);
    res.status(500).send('Internal Server Error');
  })
}

contactController.deleteContact = (req, res) => {
  const db = mongodb.getDatabase().db('contactsproject');
  const contactId = new ObjectId(req.params.id);
  db.collection('contacts').deleteOne({ _id: contactId }).then((result) => {
    if (result.deletedCount === 0) {
      return res.status(404).send('Contact not found');
    }
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send('Contact deleted successfully');
  }).catch((err) => {
    console.error('Error deleting contact:', err);
    res.status(500).send('Internal Server Error');
  })
}

module.exports = contactController;