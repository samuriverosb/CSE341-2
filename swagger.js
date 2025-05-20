const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Project 2',
    description: 'Project 2 API Documentation',
  },
  host: process.env.HOST || 'localhost:3000',
  schemes: ['http'],
  definitions: {
    Game: {
      name: 'Halo 3',
      release_date: '2007-09-25',
      genre: ['Action', 'Single-Player', 'FPS'],
      company: 'Bungie',
      total_sales: 4200000,
      platform: ['PC', 'Xbox 360']
    }
  }
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);