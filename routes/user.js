const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user')

router.get('/', async (req, res) => {   
    const users = await User.find() 
    res.send(users);
});

router.post('/user', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let user = await User.findOne({ email: req.body.email})
    if (user) {
        return res.status(400).send('Mavjud bo\'lgan foydalanuvchi.')
    }
    
    user = new User(_.pick(req.body, ['restaurant', 'firstName', 'lastName', 'email', 'password', 'phone', 'address', 'city', 'active'])); 
   
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
   
    
    await user.save();
    res.send(user)
    
   
});



module.exports = router;