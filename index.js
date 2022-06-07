const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

app.listen(process.env.PORT)

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOURL);

userControllers = require('./controllers/userControllers/userControllers');

app.post('/', (req, res) => {
    res.send(req.body.message);
});

app.use('/user', userControllers);