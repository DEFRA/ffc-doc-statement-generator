const Joi = require('joi')

module.exports = Joi.number().integer().positive().optional().allow(null)
  .messages({
    'number.base': 'The document reference must be a number.',
    'number.integer': 'The document reference must be an integer.',
    'number.positive': 'The document reference must be a number greater than 0.',
    '*': 'The document reference must be a positive integer.'
  })
