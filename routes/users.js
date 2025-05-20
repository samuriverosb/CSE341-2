const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../validators');

router.get(
  '/',
  /* #swagger.tags = ['Users'] */
  userController.getUsers
);

router.get(
  '/:id',
  /* #swagger.tags = ['Users'] */
  userController.getUserById
);

router.post(
  '/',
  /* #swagger.tags = ['Users']
     #swagger.parameters['user'] = {
       in: 'body',
       description: 'New user data',
       required: true,
       schema: { $ref: '#/definitions/User' }
     }
  */
  validate.createUserValidator(),
  validate.checkCreateUserData,
  userController.createUser
);
router.put(
  '/:id',
  /* #swagger.tags = ['Users']
     #swagger.parameters['id'] = {
       in: 'path',
       description: 'MongoDB ObjectId of the user',
       required: true,
       type: 'string'
     }
     #swagger.parameters['user'] = {
       in: 'body',
       description: 'Fields to update',
       required: true,
       schema: { $ref: '#/definitions/User' }
     }
  */
  validate.updateUserValidator(),
  validate.checkUpdateUserData,
  userController.updateUser
);
router.delete(
  '/:id',
  /* #swagger.tags = ['Users'] */
  userController.deleteUser
);

module.exports = router;
