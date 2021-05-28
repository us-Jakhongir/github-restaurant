const mongoose = require('mongoose');
const Joi = require('joi');

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String
    },
    region: {
        id: id
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

function validateFoodItem(foodItem) {
    const schema = {
        name: Joi.string()        
    }
    return Joi.validate(foodItem, schema)
};

module.exports.FoodItem = FoodItem;
module.exports.validate = validateFoodItem;