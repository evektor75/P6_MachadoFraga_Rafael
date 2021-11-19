const passwordValidator = require('password-validator');
const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .is().not().oneOf(['azertyuiop','Passw0rd', 'Password123']);

module.exports = passwordSchema;