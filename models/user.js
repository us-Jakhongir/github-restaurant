const mongoose = require('mongoose');
const Joi = require('joi');


const userSchema = new mongoose.Schema({
    restaurant: {
        type: '',

    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    phone: {
        type: Number,
        required: true,
        minlength: 9
    },
    favorites: {

    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    createdAt: {
       date: {type: Date, default: new Date} // qararlsin
    },
    updatedAt: {
        date: {type: Date, default: new Date} // qararlsin
    },
    active: {
        type: Boolean,
        default: true
    },
    passwordRequested: {
        type: Boolean,
        default: false
    },
    passwordRequestedAt: {
        date: {type: Date, default: Date.now}
    }
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().required().min(8).max(1024),
        email: Joi.string().required().email(),
        restaurant: Joi.string().required(),
        phone: Joi.number().required().min(9),
        address: Joi.string().required(),
        city: Joi.string().required(),
        active: Joi.boolean()
    }
    return Joi.validate(user, schema)
}

module.exports.User = User;
module.exports.validate = validateUser;