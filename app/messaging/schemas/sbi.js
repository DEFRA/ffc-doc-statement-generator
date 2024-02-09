const Joi = require('joi')

module.exports = Joi.number().integer().min(105000000).max(999999999).required().messages({
  'number.base': 'SBI must be a number',
  'number.integer': 'SBI must be an integer',
  'number.min': 'SBI must be at least 9 digits',
  'number.max': 'SBI must be no more than 9 digits',
  'any.required': 'is required'
})
