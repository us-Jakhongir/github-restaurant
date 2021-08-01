const mongoose = require('mongoose');
const Joi = require('joi');

const { Region } = require('./region');

const citySchema = new mongoose.Schema({
    name: {
        type: String,        
    },
    region: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Region'
    }
},
{ timestamps: true }
);

const City = mongoose.model('City', citySchema);

function validateCity(city) {
    const schema = {
        name: Joi.string().required(),
        regionId: Joi.string().required()
    }
    return Joi.valildate(city, schema)
};

module.exports.City = City;
module.exports.validate = validateCity;
