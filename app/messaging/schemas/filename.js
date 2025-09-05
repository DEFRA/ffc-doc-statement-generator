const Joi = require('joi')
const matchPattern = require('./filename-regex-validation')

module.exports = Joi.string()
  .custom((value, helpers) => {
    if (!matchPattern(value)) {
      return helpers.error('string.pattern.base')
    }
    return value
  }, 'filename validation')
  .required()
  .messages({
    'string.pattern.base': 'filename must match the required pattern',
    'string.base': 'filename must be a string',
    'any.required': 'filename is missing but it is required'
  })
