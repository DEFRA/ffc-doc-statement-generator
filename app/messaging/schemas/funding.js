const Joi = require('joi')

module.exports = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'name is missing but it is required.',
    'string.base': 'The name must be a string.'
  }),
  level: Joi.string().optional().allow('', null).messages({
    'string.base': 'The level must be a string.'
  }),
  area: Joi.number().optional().allow('', null).messages({
    'number.base': 'The area must be a number.'
  }),
  rate: Joi.number().optional().allow('', null).messages({
    'number.base': 'The rate must be a number.'
  }),
  annualValue: Joi.number().required().messages({
    'any.required': 'annualValue is missing but it is required.',
    'number.base': 'The annual value must be a number.'
  }),
  quarterlyValue: Joi.number().required().messages({
    'any.required': 'perquarterlyValueiod is missing but it is required.',
    'number.base': 'The quarterly value must be a number.'
  }),
  quarterlyReduction: Joi.number().required().messages({
    'any.required': 'quarterlyReduction is missing but it is required.',
    'number.base': 'The quarterly reduction must be a number.'
  }),
  quarterlyPayment: Joi.number().required().messages({
    'any.required': 'quarterlyPayment is missing but it is required.',
    'number.base': 'The quarterly payment must be a number.'
  }),
  reductions: Joi.array().items(Joi.object({
    reason: Joi.string().required().messages({
      'any.required': 'reason from reductions array is missing but it is required.',
      'string.base': 'The reason must be a string.'
    }),
    value: Joi.number().required().messages({
      'any.required': 'value from reductions array is missing but it is required.',
      'number.base': 'The value must be a number.'
    })
  })).optional().messages({
    'array.base': 'The reductions must be an array.'
  })
})
