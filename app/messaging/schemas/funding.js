const Joi = require('joi')

module.exports = Joi.object({
  name: Joi.string().required(),
  level: Joi.string().optional().allow('', null),
  area: Joi.string().optional().allow('', null),
  rate: Joi.string().optional().allow('', null),
  annualValue: Joi.string().required(),
  quarterlyValue: Joi.string().required(),
  quarterlyReduction: Joi.string().required(),
  quarterlyPayment: Joi.string().required(),
  reductions: Joi.array().items(Joi.object({
    reason: Joi.string().required(),
    value: Joi.string().required()
  })).optional()
})
