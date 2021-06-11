const mongoose = require('mongoose');
const Joi = require('joi');


const favoritesSchema = new mongoose.Schema({
    food: [],
    userId: []
},
{ timestamps: true }
);

const Favorites = mongoose.model('Favorites', favoritesSchema);

function validateFavorites(favorite) {
    const schema = {
        
    }
}

module.exports.Favorites = Favorites;