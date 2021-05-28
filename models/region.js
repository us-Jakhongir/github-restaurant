const mongoose = require('mongoose');
const Joi = require('joi');

const regionSchema = new mongoose.Schema({
    name: {
        type: String,        
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }

});

const City = mongoose.model('City', citySchema);

function validateCity(city) {
    const schema = {
        name: Joi.string().required(),
    }
    return Joi.valildate(city, schema)
};

module.exports.City = City;
module.exports.validate = validateCity;