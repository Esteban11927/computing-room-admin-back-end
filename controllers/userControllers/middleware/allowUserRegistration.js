User = require('./../../../models/userDB');

async function allowUserRegistration(req, res, next){
    //Check if username exists
    user = await User.findOne({username: req.body.username}).exec();
    if(user){
        res.send("this user already exists");
        next('route');
        return;
    }

    //check if mail is used
    user = await User.findOne({mail: req.body.mail}).exec();
    if(user){
        res.send("this mail is already being used");
        next('route');
        return;
    }

    next();
}

module.exports = allowUserRegistration;