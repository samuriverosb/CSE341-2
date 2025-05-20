const router = require('express').Router();
const { root } = require('../controllers/basicController');

router.get('/', root);
router.use('/games', require('./games'));

module.exports = router;