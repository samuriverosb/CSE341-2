const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../validators');

router.get(
  '/',
  userController.getUsers
);

router.get(
  '/:id',
  userController.getUserById
);

router.post(
  '/',
  validate.createUserValidator(),
  validate.checkCreateUserData,
  userController.createUser
);
router.put(
  '/:id',
  validate.updateUserValidator(),
  validate.checkUpdateUserData,
  userController.updateUser
);
router.delete(
  '/:id',
  userController.deleteUser
);

module.exports = router;
