const Joi = require('joi')
const minFrn = 1000000000
const maxFrn = 9999999999
module.exports = Joi.number().integer().min(minFrn).max(maxFrn).required().messages({
  'number.base': 'FRN must be a number',
  'number.integer': 'FRN must be an integer',
  'number.min': 'FRN must be at least 10 digits',
  'number.max': 'FRN must be no more than 10 digits',
  'any.required': 'is required'
})
