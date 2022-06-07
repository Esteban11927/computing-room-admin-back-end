const express = require('express');
const router = express.Router();

router.use(express.json());

const bcrypt = require('bcrypt');

const allowUserRegistration = require('./middleware/allowUserRegistration');

router.post('/registerUser', allowUserRegistration, async(req, res) => {

    // if res.message exists it's because can't allow registration
    if(res.message){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(res.message);
        return;
    }
    let username = req.body.username;
    let mail = req.body.mail;
    let plainPassWord = req.body.password;

    // hash the password
    saltRounds = parseInt(process.env.SALT_ROUNDS);
    let salt = await bcrypt.genSalt(saltRounds);
    let password = await bcrypt.hash(plainPassWord, salt);

    const User = require('../../models/userDB'); //require user model
    const user = new User({username: username, mail: mail, password: password}); //create new user object
    await user.save(); //save object on database

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("user registered");
    return;
})


module.exports = router;