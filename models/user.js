const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const { Restaurant } = require('./restaurant');
const { Favorites } = require('./favorites');


const userSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favorites'
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },    
    active: {
        type: Boolean,
        enum: ['Activ', 'Inactiv'],
        required: true
    },
    passwordRequested: {
        type: Boolean,
        default: false
    },
    passwordRequestedAt: {
        date: { type: Date, default: Date.now }
    }
},
    { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema)



function validateUser(user) {
    const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        restaurantId: Joi.string().required(),
        password: Joi.string().required().min(8).max(1024),
        phone: Joi.number().required().min(9),
        // favoritesId: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        active: Joi.boolean().required()
    }
    return Joi.validate(user, schema)
}

module.exports.User = User;
module.exports.validate = validateUser;