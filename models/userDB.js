const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    mail: String,
    password: String,
});

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;