const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');


const { User } = require('../models/user')



router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }   

    let user = await User.findOne({ email: req.body.email})
    if (!user) {
        return res.status(400).send('Email noto\'g\'ri.')
    }

    const isVaildParoll = await bcrypt.compare(req.body.password, user.password);
    if (!isVaildParoll) {
        return res.status(400).send('Email yoki parol noto\'g\'ri.')
    }

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(true);
});

function validate(req) {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(1024)        
    }
    return Joi.validate(req, schema)
}


module.exports = router;