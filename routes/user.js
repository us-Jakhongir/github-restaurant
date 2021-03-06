const express = require('express');
const objecId = require('mongodb').ObjectID;
const router = express.Router();
const bcrypt = require('bcrypt');

const { User, validate } = require('../models/user')
const { restaurantSchema, Restaurant } = require('../models/restaurant')
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.send(users);
});

router.get('/:email', async (req, res) => {
    const user = await User.findOne({ email: req.params.email }).select('-password');
    if (!user) {
        return res.status(404).send('Berilgan emailga teng foydalanuvchi topilmadi.');
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
        return res.status(404).send('Berilgan IDga teng restaran topilmadi')
    }

    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send('Mavjud bo\'lgan foydalanuvchi.')
    }



    user = new User({
        restaurant: {
            _id: restaurant._id
        },
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        // favorites: {
        //     _id: favorites._id
        // },
        city: req.body.city,
        active: req.body.active
    });


    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);


    const saveUser = await user.save();
    res.status(201).send(saveUser)


});


router.put('/:id', auth, async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
        } 
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });
            res.status(200).json(user);

        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(404).json("Berilgan IDga teng foydalanuvchi topilmadi.")
    }
});



router.delete('/:id', auth, async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Foydalanuvchi o'chirildi.");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(404).json("Bunday foydalanuvchi mavjud emas.").select('-password')
    }
});



module.exports = router;