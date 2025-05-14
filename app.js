const express = require('express');
const mongodb = require('./database');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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