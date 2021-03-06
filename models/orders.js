const mongoose = require('mongoose');
const Joi = require('joi');
const { User, userSchema } = require('./user');
const { Restaurant, restaurantSchema } = require('./restaurant');

const ordersSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    total: {
        type: Number,
        required: true
    },
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
//     }
},
{ timestamps: true }
);

const Orders = mongoose.model('Orders', ordersSchema);

function validateUser(order) {
    const schema = {
        userId: Joi.string().required(),
        restaurantId: Joi.string().required(),
        total: Joi.Number().required()
    }
    return Joi.validate(order, schema)
}


module.exports.Orders = Orders;
module.exports.validate = validateUser;