const mongoose = require('mongoose');
const Joi = require('joi');


const ratingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

const Rating = mongoose.model('Rating', ratingSchema);

function validateRating(rating) {
    const schema = {
        rating: Joi.Number().required(),
        createdAt: Joi.Number().required(),
        userId: Joi.string().required()
    }
};

module.exports.Rating = Rating;
module.exports.validate = validateRating;