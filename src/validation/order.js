const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const phoneSchema = Joi.object({
  phoneId: Joi.objectId(),
  phoneCount: Joi.number().integer().required(),
}).required();

const cartSchema = Joi.array().items(phoneSchema).min(1).unique().required();

module.exports = {
  body: {
    userId: Joi.objectId(),
    cart: Joi.alternatives().try(phoneSchema, cartSchema).required()
  }
};
