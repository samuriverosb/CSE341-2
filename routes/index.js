const router = require('express').Router();
const { root } = require('../controllers/basicController');

router.get('/', root);
router.use('/games', require('./games'));
router.use('/users', require('./users'));

module.exports = router;