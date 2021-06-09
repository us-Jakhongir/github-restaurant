const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');

const { User, validate } = require('../models/user')
const { restaurantSchema, Restaurant } = require('../models/restaurant')
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.send(users);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        return res.status(404).send('Berilgan idga teng foydalanuvchi topilmadi.');
    }
    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let restaurant = await Restaurant.findById(req.body.restaurantId)
    if (!restaurant) {
        return res.status(400).send('Berilgan IDga teng restaran topilmadi')
    }

    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send('Mavjud bo\'lgan foydalanuvchi.')
    }



    user = new User({
        restaurant: {
            _id: restaurant._id,
        },
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        active: req.body.active
    });


    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);


    await user.save();
    res.send(user)


});


router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let user = await User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        active: req.body.active
    },
    { new: true });
    if (!user)
        return res.status(404).send('Berilgan idga teng foydalanuvchi topilmadi.');

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    res.send(user);
});


router.delete('/:id', auth, async (req, res) => {
    let user = await User.findByIdAndRemove(req.params.id);
    if (!user)
        return res.status(404).send('Berilgan idga teng foydalanuvchi topilmadi.');

    res.send(user);
})



module.exports = router;