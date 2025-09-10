const Joi = require('joi')

const maxBusinessNameLength = 160

module.exports = Joi.string().max(maxBusinessNameLength).required().messages({
  'string.base': 'Business name must be a string',
  'string.max': `Business name must be at most ${maxBusinessNameLength} characters`,
  'any.required': 'Business name is required'
})
