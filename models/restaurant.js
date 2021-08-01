const mongoose = require('mongoose');
const Joi = require('joi');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // phone: {
    //     type: String,
    //     required: true
    // },
    // address: {
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // password: {
    //     type: String,
    //     required: true
    // },
    // activ: {
    //     type: Boolean,
    //     default: true  
    // },
    // paid: {
    //     type: Boolean,
    //     default: true
    // },
    // website: {
    //     type: String
    // },
    // img: {
    //     type: String 
    // },
    // workDays: {
    //     type: []
    // },
    // openHour: {

    // },
    // closeHour: {

    // },
    // delivery: {
    //     type: Boolean,
    //     default: true
    // },
    // takeOut: {
    //     type: Boolean,
    //     default: true
    // },
    // geoLocation: {
    //     type: String
    // }
},
{ timestamps: true }
);


const Restaurant = mongoose.model('Restaurant', restaurantSchema);

function validateRestaurant(restaurant) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email()

    }
    return Joi.validate(restaurant, schema)
}

module.exports.Restaurant = Restaurant;
module.exports.restaurantSchema = restaurantSchema;
module.exports.validate = validateRestaurant;