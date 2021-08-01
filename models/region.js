const mongoose = require('mongoose');
const Joi = require('joi');

const regionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true      
    }
},
{ timestamps: true }
);

const Region = mongoose.model('Region', regionSchema);

function validateRegion(region) {
    const schema = {
        name: Joi.string().required(),
    }
    return Joi.valildate(region, schema)
};

module.exports.Region = Region;
module.exports.validate = validateRegion;