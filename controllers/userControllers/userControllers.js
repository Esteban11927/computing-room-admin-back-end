const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.use(express.json());

const allowUserRegistration = require('./middleware/allowUserRegistration');
const sendRegistrationMail = require('./middleware/sendRegistrationMail');
const decodeUserConfirmJWT = require('./middleware/decodeUserConfirmJWT');

router.post('/registerUser', allowUserRegistration, sendRegistrationMail, async(req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Check your mail to confirm your registration");
    return;
})

router.get('/confirmRegistration/:jwt', decodeUserConfirmJWT, allowUserRegistration, async(req, res) => {

    // hash the password
    saltRounds = parseInt(process.env.SALT_ROUNDS);
    let salt = await bcrypt.genSalt(saltRounds);
    let password = await bcrypt.hash(req.body.password, salt);

    const User = require('../../models/userDB'); //require user model
    const user = new User({username: req.body.username, mail: req.body.mail, password: password}); //create new user object
    await user.save(); //save object on database

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("user registered");
})


module.exports = router;