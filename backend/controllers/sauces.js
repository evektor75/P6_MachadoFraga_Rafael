const Sauce = require('../models/Sauce');
const fs = require('fs');


//Création d'une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,//initialisation des likes à 0
        dislikes: 0, // initialisation des dislikes à 0
        usersLiked: [], //initialisation d'un tableau vide pour les utilisateurs qui ont aimé
        usersDisliked: [], //initialisation d'un tableau vide pour les utilisateurs qui n'ont pas aimé
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce uploadé' }))
        .catch(() => res.status(400).json({ error }));
};

//Modification d'une sauce
exports.modifySauce = (req, res, next) => {
    let sauceObject = {};
    req.file ? (
        Sauce.findOne({
            _id: req.params.id
        })
            .then((sauce) => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlinkSync(`images/${filename}`)
            }),
        sauceObject =
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        }
    ) : (
        sauceObject = { ...req.body },
        console.log(sauceObject)
    )
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};

//Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));

};

//Obtention d'une sauce spécifique
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

//Obtention de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

//Fonction like et Dislike (Ajout et retrait)

exports.likeAndDislike = (req, res, next) => {
    const like = req.body.like;
    const sauceId = req.params.id;
    const userId = req.body.userId;

    if (like === 1) {
        Sauce.updateOne({
            _id: sauceId
        }, {
            $push: {
                usersLiked: userId
            },
            $inc: {
                likes: +1
            },
        })
            .then(() => res.status(201).json({ message: `${userId} a aimé !` }))
            .catch(error => res.status(400).json({ error }));
    }

    if (like === -1) {
        Sauce.updateOne({
            _id: sauceId
        }, {
            $push: {
                usersDisliked: userId
            },
            $inc: {
                dislikes: +1
            },
        }
        )
            .then(() => res.status(201).json({ message: `${userId} n'aime pas !` }))
            .catch(error => res.status(400).json({ error }));
    }

    if (like === 0) {
        Sauce.findOne({
            _id: sauceId
        })
            .then((sauce) => {
                if (sauce.usersLiked.includes(userId)) {
                    Sauce.updateOne({
                        _id: sauceId
                    }, {
                        $pull: {
                            usersLiked: userId
                        },
                        $inc: {
                            likes: -1
                        },
                    })
                        .then(() => res.status(200).json({ message: 'Like retiré' }))
                        .catch(err => res.status(400).json({ err }));
                }
                if (sauce.usersDisliked.includes(userId)) {
                    Sauce.updateOne({
                        _id: sauceId
                    }, {
                        $pull: {
                            usersDisliked: userId
                        },
                        $inc: {
                            dislikes: -1
                        },
                    })
                        .then(() => res.status(200).json({ message: 'Dislike retiré' }))
                        .catch(err => res.status(400).json({ err }));
                }

            })
    }

}


