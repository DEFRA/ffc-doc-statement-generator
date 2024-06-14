const Joi = require('joi')

module.exports = Joi.string().optional().allow('', null).messages({
  'string.base': 'The email must be a string.'
})
