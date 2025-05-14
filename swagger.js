const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: process.env.HOST || 'localhost:3000',
  schemes: ['http'],
  definitions: {
    NewContact: {
      firstName: 'Samuel',
      lastName:  'Riveros',
      email:     'test@test.com',
      favoriteColor: 'Black',
      birthday:  '1999-05-23'
    }
  }
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);