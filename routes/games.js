const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');
const validate = require('../validators');

router.get(
  '/',
  gamesController.getGames
);

router.get(
  '/:id',
  gamesController.getGameById
);

router.post(
  '/',
  validate.createGameValidator(),
  validate.checkCreateData,
  gamesController.createGame
);
router.put(
  '/:id',
  validate.updateGameValidator(),
  validate.checkUpdateData,
  gamesController.updateGame
);
router.delete(
  '/:id',
  gamesController.deleteGame
);

module.exports = router;
