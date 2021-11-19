const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces'); //import fonctions ajout,suppression,modification ...
const auth = require('../middleware/auth');//import middleware authentification
const multer = require('../middleware/multer-config'); //import middleware multer


router.post('/', auth, multer, saucesCtrl.createSauce);
router.post('/:id/like', auth, saucesCtrl.likeAndDislike);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauces);

module.exports = router;