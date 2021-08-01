const express = require('express');
const router = express.Router();

const { Favorites, validate } = require('../models/favorites');
const { Food } = require('../models/food');
const { User } = require('../models/user');

router.get('/', async (req, res) => {
    const favorites = await Favorites.find()
    res.send(favorites)
});


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let food = await Food.findById(req.body.foodId);
    if (!food)
        return res.status(404).send('Berilgan IDga teng food topilmadi.');

    let user = await User.findById(req.body.userId);
    if (!user)
        return res.status(404).send('Berilgan IDga teng foydalanuvchi topilmadi.');

    

    let favorite = new Favorites({
        food: {
            _id: food._id
        },
        user: {
            _id: user._id
        }
    });

    const saveFavorite = await favorite.save();

    res.status(201).send(saveFavorite)

});

module.exports.router = router;