const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const checkPassword = require('../middleware/checkPassword');
const rateLimit = require("../middleware/rateLimit");


router.post('/signup', checkPassword, userCtrl.signup);
router.post('/login', rateLimit.limiter, userCtrl.login);

module.exports = router;