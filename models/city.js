const mongoose = require('mongoose');
const Joi = require('joi');

const citySchema = new mongoose.Schema({
    name: {
        type: String,        
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

const City = mongoose.model('City', citySchema);

function validateCity(city) {
    const schema = {
        name: Joi.string().required(),
        region: Joi.string() //
    }
    return Joi.valildate(city, schema)
};

module.exports.City = City;
module.exports.validate = validateCity;