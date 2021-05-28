const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        required: true
    },
    restaurant: {
        id: Number,
        required: true
    }
});

const Category = mongoose.model('Category', categorySchema);

function validateCategory(category) {
    const schema = {
        name: Joi.string().required(),
        createdAt: Joi.Number().required(),
        restaurant: Joi.Number().required()
    }
    return Joi.validate(category, schema)
}

module.exports.Category = Category;
module.exports.validate = validateCategory;