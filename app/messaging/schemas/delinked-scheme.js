const Joi = require('joi')

module.exports = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'name is missing but it is required.',
    'string.base': 'The name must be a string.'
  }),
  shortName: Joi.string().required().messages({
    'any.required': 'shortName is missing but it is required.',
    'string.base': 'The short name must be a string.'
  }),
  year: Joi.number().integer().required().messages({
    'any.required': 'year is missing but it is required.',
    'number.base': 'The year must be a string.'
  })
}).required().messages({
  'any.required': 'scheme object is missing but it is required.'
})
