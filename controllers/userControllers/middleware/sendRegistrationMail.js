const nodemailer = require('nodemailer');

const bcrypt = require('bcrypt');

async function sendRegistrationMail(req, res, next){
    let username = req.body.username;
    let mail = req.body.mail;
    let plainPassWord = req.body.password;

    // hash the password
    saltRounds = parseInt(process.env.SALT_ROUNDS);
    let salt = await bcrypt.genSalt(saltRounds);
    let password = await bcrypt.hash(plainPassWord, salt);

    var jwt = require('jsonwebtoken');
    var token = jwt.sign({username: username, mail: mail, password: plainPassWord}, process.env.SECRET_PASSWORD_MAIL_REGISTRATION);
    ref = process.env.BASEURL+"/user/confirmRegistration/"+token;
    console.log(ref);

    var transporter = nodemailer.createTransport({
        service: process.env.MAIL_SENDER_SERVICE,
        auth: {
          user: process.env.MAIL_SENDER,
          pass: process.env.MAIL_SENDER_PASSWORD
        }
    });
    var mailOptions = {
        from: process.env.MAIL_SENDER,
        to: mail,
        subject: 'Confirm your registration ' + username,
        html: '<a href="' + ref + '">Confirm by clicking me</a>'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    next();
}

module.exports = sendRegistrationMail;