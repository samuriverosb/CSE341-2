const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');
const validate = require('../validators');
const authenticateToken = require('../middleware/auth');

router.get(
  '/',
  authenticateToken,
  /* #swagger.tags = ['Games']
     #swagger.security = [{ "BearerAuth": [] }]
  */
  gamesController.getGames
);

router.get(
  '/:id',
  authenticateToken,
  /* #swagger.tags = ['Games']
     #swagger.security = [{ "BearerAuth": [] }]
  */
  gamesController.getGameById
);

router.post(
  '/',
  authenticateToken,
  /* #swagger.tags = ['Games']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['game'] = {
       in: 'body',
       description: 'New game data',
       required: true,
       schema: { $ref: '#/definitions/Game' }
     }
  */
  validate.createGameValidator(),
  validate.checkCreateData,
  gamesController.createGame
);

router.put(
  '/:id',
  authenticateToken,
  /* #swagger.tags = ['Games']
     #swagger.security = [{ "BearerAuth": [] }]
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the game',
       required: true,
       type: 'string'
     }
     #swagger.parameters['game'] = {
       in: 'body',
       description: 'Fields to update',
       required: true,
       schema: { $ref: '#/definitions/Game' }
     }
  */
  validate.updateGameValidator(),
  validate.checkUpdateData,
  gamesController.updateGame
);

router.delete(
  '/:id',
  authenticateToken,
  /* #swagger.tags = ['Games']
     #swagger.security = [{ "BearerAuth": [] }]
  */
  gamesController.deleteGame
);

module.exports = router;
