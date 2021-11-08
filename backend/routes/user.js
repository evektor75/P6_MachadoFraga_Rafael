const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const { route } = require('./sauces');

router.post('/signup', userCtrl.signup);
route.post('/login', userCtrl.login);

module.exports = router;