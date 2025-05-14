const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.getContacts);
router.get('/:id', contactController.getContactById);

/**
 * Create a new contact
 * #swagger.tags = ['Contacts']
 * #swagger.description = 'Creates a new contact.'
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   description: 'Contact object',
 *   required: true,
 *   schema: { $ref: '#/definitions/NewContact' }
 * }
 * #swagger.responses[201] = {
 *   description: 'Contact created',
 *   schema: { $ref: '#/definitions/NewContact' }
 * }
 */

router.post('/', contactController.createContact);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;