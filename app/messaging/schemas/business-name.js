const Joi = require('joi')

module.exports = Joi.string().required().messages({
  'any.required': 'business-name object is missing but it is required.',
  'string.empty': 'The business name cannot be empty.'
})
