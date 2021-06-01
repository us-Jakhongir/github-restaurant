const express = require('express');
const router = express.Router();

const { Orders, validate } = require('../models/orders');
const { User } = require('../models/user');
const { Restaurant } = require('../models/restaurant')

router.get('/', async (req, res) => {
    const orders = await Orders.find()
    res.send(orders)
});


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let user = await User.findById(req.body.userId)
    if (!user)
        return res.status(400).send('Berilgan IDga teng foydalanuvchi topilmadi')

    let restaurant = await Restaurant.findById(req.body.restaurantId)
    if (!restaurant)
        return res.status(400).send('Berilgan IDga teng Restaran topilmadi')





    let order = new Orders({
        user: {
            _id: user._id
        },
        restaurant: {
            _id: restaurant._id
        }

    });

    await order.save();
    res.send(order)
})

module.exports = router;