const router = require('express').Router();
const { root } = require('../controllers/basicController');

router.get('/', root);
router.use('/contacts', require('./contacts'));

module.exports = router;