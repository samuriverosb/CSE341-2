const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const validate = require('../validators');
const authenticateToken = require('../middleware/auth');

router.get(
  '/',
  authenticateToken,
  /* #swagger.tags = ['Users']
     #swagger.security = [{ "BearerAuth": [] }]
  */
  userController.getUsers
);

router.get(
  '/:id',
  authenticateToken,
  /* #swagger.tags = ['Users']
     #swagger.security = [{ "BearerAuth": [] }]
  */
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
  authenticateToken,
  /* #swagger.tags = ['Users']
     #swagger.security = [{ "BearerAuth": [] }]
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
  authenticateToken,
  /* #swagger.tags = ['Users']
     #swagger.security = [{ "BearerAuth": [] }]
  */
  userController.deleteUser
);

router.post(
  '/register',
  /* #swagger.tags = ['Auth']
     #swagger.parameters['user'] = {
       in: 'body',
       description: 'Register new user',
       required: true,
       schema: { $ref: '#/definitions/User' }
     }
  */
  validate.createUserValidator(),
  validate.checkCreateUserData,
  authController.register
);

router.post(
  '/login',
  /* #swagger.tags = ['Auth']
     #swagger.parameters['credentials'] = {
       in: 'body',
       description: 'User login credentials',
       required: true,
       schema: { username: 'string', password: 'string' }
     }
  */
  authController.login
);

router.post(
  '/logout',
  /* #swagger.tags = ['Auth'] */
  authController.logout
);

module.exports = router;
