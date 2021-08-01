const express = require('express');
const router = express.Router();

const { Food, validateFood } = require('../models/food')

router.get('/', async (req, res) => {
    const foods = await Food.find();
    res.send(foods)
});


router.post('/', async (req, res) => {
    const { error } = validateFood(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let restaurant = await Restaurant.findById(req.body.restaurantId)
    if (!restaurant) {
        return res.status(404).send('Berilgan IDga teng restaran topilmadi');
    }

    let food = await Food.findById(req.body.userId);
    if (food)
        return res.status(404).send('Berilgan IDga teng food mavjud.');



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


router.put('/:id', async (req, res) => {

});


router.get('/:id', async (req, res) => {

});


router.delete('/:id', async (req, res) => {

});

module.exports = router;