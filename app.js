const express = require('express');
const mongodb = require('./database');
const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.initDatabase((err, db) => {
  if (err) {
    console.error('Failed to initialize database', err);
  } else {
    app.listen(port, () => {
      console.log('Web Server is listening at port ' + (port));
    });
  }
});