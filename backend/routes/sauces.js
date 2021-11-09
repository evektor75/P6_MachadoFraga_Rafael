const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces'); //import fonctions ajout,suppression,modification ...
const auth = require('../middleware/auth');//import middleware authentification
const multer = require('../middleware/multer-config'); //import middleware multer

router.post('/', auth,multer, saucesCtrl.createThing);
router.put('/:id',auth,multer, saucesCtrl.modifyThing);
router.delete('/:id',auth, saucesCtrl.deleteThing);
router.get('/:id',auth, saucesCtrl.getOneThing);
router.get('/', auth, saucesCtrl.getAllThings);

module.exports = router;