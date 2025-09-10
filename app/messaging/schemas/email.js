const Joi = require('joi')

const maxEmail = 260

module.exports = Joi.string().optional().allow('', null).max(maxEmail).messages({
  'string.base': 'Email must be a string',
  'string.max': `Email must be at most ${maxEmail} characters`
})
