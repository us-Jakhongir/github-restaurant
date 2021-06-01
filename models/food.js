const mongoose = require('mongoose');
const Joi = require('joi');
const { Restaurant, restaurantSchema } = require('./restaurant');

const foodSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    rating: {
        type: Number,

    },
    description: {
        type: String,
        required: true
    },
    size: [
        // { size: 'sm', price: 1200 }
    ],
    status: [],
    category: [],
    prepareTime: {
        type: Number
    },
    active: {
        type: Boolean,
        default: true
    },
    toppings: [
        // { name: 'Cheese', price: 2, qty: 1 }
    ],
    ingredients: ['Tuz', 'Piyoz'],
    isFeatured: {
        type: Boolean,
        default: false
    },
    featuredExpiresAt: {
        date: { type: Date, default: Date.now }
    },
    featuredStartsAt: {
        date: { type: Date, default: Date.now }
    }
});

const Food = mongoose.model('Food', foodSchema);

// function validateFood(food) {
//     const schema = {

//     }
// }

module.exports = Food;