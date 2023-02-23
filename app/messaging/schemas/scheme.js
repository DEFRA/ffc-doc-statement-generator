const Joi = require('joi')

module.exports = Joi.object({
  name: Joi.string().required(),
  shortName: Joi.string().required(),
  year: Joi.string().required(),
  frequency: Joi.string().required(),
  agreementNumber: Joi.string().required()
}).required()
