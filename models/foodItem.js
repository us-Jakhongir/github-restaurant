const mongoose = require('mongoose');
const Joi = require('joi');

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String
    },
    region: {
        id: id
    }
},
{ timestamps: true }
);

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

function validateFoodItem(foodItem) {
    const schema = {
        name: Joi.string()        
    }
    return Joi.validate(foodItem, schema)
};

module.exports.FoodItem = FoodItem;
module.exports.validate = validateFoodItem;