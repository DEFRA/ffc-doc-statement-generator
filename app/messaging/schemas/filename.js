const Joi = require('joi')

module.exports = Joi.string().required()
  .messages({
    'string.base': 'The filename must be a string.',
    'any.required': 'The filename is required.',
    '*': 'The filename is required.'
  })
