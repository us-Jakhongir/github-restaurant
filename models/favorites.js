const mongoose = require('mongoose');
const Joi = require('joi');

const { User } = require('./user');
const { Food } = require('./food');


const favoritesSchema = new mongoose.Schema({
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true }
);

const Favorites = mongoose.model('Favorites', favoritesSchema);

function validateFavorites(favorite) {
    const schema = {
        foodId: Joi.string().required(),
        userId: Joi.string().required()
    }
    return Joi.validate(favorite, schema)
}

module.exports.Favorites = Favorites;
module.exports.validate = validateFavorites;