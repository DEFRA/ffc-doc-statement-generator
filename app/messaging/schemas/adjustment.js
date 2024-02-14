const Joi = require('joi')

module.exports = Joi.object({
  currentValue: Joi.number().required(),
  newValue: Joi.number().required(),
  adjustmentValue: Joi.number().required()
}).required()
