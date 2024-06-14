const Joi = require('joi')

module.exports = Joi.object({
  currentValue: Joi.number().required().messages({
    'any.required': 'currentValue number is missing but it is required.',
    'number.base': 'The current value must be a number.'
  }),
  newValue: Joi.number().required().messages({
    'any.required': 'newValue number is missing but it is required.',
    'number.base': 'The new value must be a number.'
  }),
  adjustmentValue: Joi.number().required().messages({
    'any.required': 'adjustmentValue number is missing but it is required.',
    'number.base': 'The adjustment value must be a number.'
  })
}).required().messages({
  'any.required': 'adjusments object is missing but it is required.'
})
