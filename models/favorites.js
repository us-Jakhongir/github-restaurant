const mongoose = require('mongoose');
const Joi = require('joi');
const func = require('joi/lib/types/func');

const favoritesSchema = new mongoose.Schema({
    food: [],
    userId: [],
    createdAt: {
        type: Date,
        default: new Date
    },
    updatedAt: {
        type: Date,
        default: new Date
    }
});

const Favorites = mongoose.model('Favorites', favoritesSchema);

function validateFavorites(favorite) {
    const schema = {
        
    }
}

module.exports.Favorites = Favorites;