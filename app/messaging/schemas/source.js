const SOURCE = require('../../constants/message-source')

const Joi = require('joi')

module.exports = Joi.string().valid(SOURCE).required()
  .messages({
    'string.base': 'The source must be a string.',
    'any.only': `The source must be ${SOURCE}.`,
    'any.required': 'The source is required.',
    '*': `The source must be ${SOURCE}.`
  })
