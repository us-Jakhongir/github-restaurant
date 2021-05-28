const express = require('express');
const router = express.Router();

const {Orders, validate} = require('../models/orders');
const  User  = require('../models/user');
const Restaurant = require('../models/orders')

router.get('/', async (req, res) => {
    const orders = await Orders.find()
    res.send(orders)
});


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    try {        
        let user = await User.findById(req.body.userId);
        if (!user)
        return res.status(400).send('Berilgan IDga teng bo\'lgan foydalanuvchi topilmadi.')
        // let restaurant = await Restaurant.findById(req.body.restaurantId)
        // if (!restaurant) 
        // return res.status(404).send('Berilgan IDga teng bo\'lgan Restaurant topilmadi.')
    } catch (error) {
        res.status(500).send('Kutilmagan xato...')
    }





    let ord = new Orders({
        user: {_id: user._id}
        // restaurantId: { _id: restaurant._id}
    });

    ord = await ord.save();n 
    res.send(ord)
})

module.exports = router;