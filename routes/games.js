const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');
const validate = require('../validators');

/**
 * @route POST /games
 * @group Games
 */

router.get(
  '/',
  /* #swagger.tags = ['Games'] */
  gamesController.getGames
);

router.get(
  '/:id',
  /* #swagger.tags = ['Games'] */
  gamesController.getGameById
);

router.post(
  '/',
  /* #swagger.tags = ['Games']
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
  /* #swagger.tags = ['Games']
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
  /* #swagger.tags = ['Games'] */
  gamesController.deleteGame
);

module.exports = router;
