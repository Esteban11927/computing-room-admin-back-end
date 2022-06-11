async function decodeUserConfirmJWT(req, res, next){
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(req.params.jwt, process.env.SECRET_PASSWORD_MAIL_REGISTRATION);
    req.body.username = decoded.username;
    req.body.password = decoded.password;
    req.body.mail = decoded.mail;
    next();
}

module.exports = decodeUserConfirmJWT;