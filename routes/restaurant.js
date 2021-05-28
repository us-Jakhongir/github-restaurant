const express = require('express');
const router = express.Router();
const _ = require('lodash');


const {Restaurant, validate} = require('../models/restaurant')

router.get('/', async (req, res) => {
    const restaurant = await Restaurant.find()
    res.send(restaurant)
});


router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let restaurant = await Restaurant.findOne({ email: req.body.email})
    if (restaurant) {
        return res.status(400).send('Mavjud bo\'lgan restaurant.')
    }

   restaurant = new Restaurant(_.pick(req.body, ['name', 'email']));

    await restaurant.save();
    res.send(restaurant)

})
module.exports = router;