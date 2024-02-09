const Joi = require('joi')

module.exports = Joi.number().integer().min(1000000000).max(9999999999).required().messages({
  'number.base': 'FRN must be a number',
  'number.integer': 'FRN must be an integer',
  'number.min': 'FRN must be at least 10 digits',
  'number.max': 'FRN must be no more than 10 digits',
  'any.required': 'is required'
})
