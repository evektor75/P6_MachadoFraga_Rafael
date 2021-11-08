const express = require('express');

const app = express(); //Creation application express

app.use((req, res, next) => {
    console.log('requete reçue');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
})

app.use((req, res, next) => {
    res.json({ message: 'votre requête a bien été recue' });
    next();
});

app.use((req, res) => {
    console.log('reponse envoyé');
});



module.exports = app;

