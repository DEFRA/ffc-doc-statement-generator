const Joi = require('joi')

module.exports = Joi.string().optional().allow('', null).messages({
  'string.base': 'The payment period must be a string.'
})
