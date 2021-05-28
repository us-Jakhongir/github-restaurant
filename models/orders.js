const mongoose = require('mongoose');
const Joi = require('joi');
const User = require('./user');
const Restaurant = require('./restaurant');


const ordersSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    // restaurant: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Restaurant'
    // }
//     total: {
//         type: Number,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['canceled', 'delevired', 'pending', 'ready'],
//         default: 'pending',
//         required: true
//     },
//     deliveredAt: {
//         type: Date,
//         required: true
//     },
//     canceledAt: {
//         type: Date
//     },
//     items: {
//         type: Array,
//         default: []
//     },
//     desiredAt: {
//         type: Date
//     },
//     subTotal: {
//         type: Number,
//         required: true
//     },
//     discount: {
//         type: Number
//     },
//     discountType: {
//         type: ['amount', '%']
//     },
//     createdAt: {
//         type: Date,
//         default: new Date
//     },
//     updatedAt: {
//         type: Date,
//         default: new Date
//     }
});

const Orders = mongoose.model('Orders', ordersSchema);

function validateUser(order) {
    const schema = {
        userId: Joi.string().required(),
        // restaurantId: Joi.string().required()
    }
    return Joi.validate(order, schema)
}


module.exports.Orders = Orders;
module.exports.validate = validateUser;