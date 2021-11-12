const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'TOKEN_ALEATOIRE');
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            res.status(403).json({error : 'Requête non authorisée'});
        }else {
            next();
        }

    } catch (error) {
        res.status(401).json({ error: error | 'requete non authentifiée' });
    }

};