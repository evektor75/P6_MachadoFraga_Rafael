const passwordSchema = require('../models/passwords');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, '{message : "Le mot de passe doit contenir : au moins 8 caractères, 1 majuscule , 1 minuscule, 1 chiffre et 1 symbole"}', {
            'content-type': 'application/json'
        });
        res.end('Format du mot de passe incorrect')
    } else {
        next();
    }
}