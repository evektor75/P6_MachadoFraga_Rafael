const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMS: 5 * 60 * 1000,
    max: 5,
    message: "Votre compte est bloqué pour 5 min"
})

module.exports = { limiter }