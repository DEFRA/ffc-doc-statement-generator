const Joi = require('joi')

module.exports = Joi.object({
  name: Joi.string().required(),
  level: Joi.string().optional().allow('', null),
  area: Joi.number().optional().allow('', null),
  rate: Joi.number().optional().allow('', null),
  annualValue: Joi.number().required(),
  quarterlyValue: Joi.number().required(),
  quarterlyReduction: Joi.number().required(),
  quarterlyPayment: Joi.number().required(),
  reductions: Joi.array().items(Joi.object({
    reason: Joi.string().required(),
    value: Joi.number().required()
  })).optional()
})
