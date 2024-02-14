const Joi = require('joi')

module.exports = Joi.number().required()
  .messages({
    'number.base': 'The remaining amount must be a number.',
    '*': 'The remaining amount is required.'
  })
