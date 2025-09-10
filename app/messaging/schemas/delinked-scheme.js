const Joi = require('joi')

const maxSchemeShortNameLength = 10
const maxSchemeNameLength = 100
const minYear = 1000
const maxYear = 9999

module.exports = Joi.object({
  name: Joi.string().max(maxSchemeNameLength).required().messages({
    'string.base': 'Scheme name must be a string',
    'string.max': `Scheme name must be at most ${maxSchemeNameLength} characters`,
    'any.required': 'Scheme name is required'
  }),
  shortName: Joi.string().max(maxSchemeShortNameLength).required().messages({
    'string.base': 'Scheme short name must be a string',
    'string.max': `Scheme short name must be at most ${maxSchemeShortNameLength} characters`,
    'any.required': 'Scheme short name is required'
  }),
  year: Joi.number().integer().min(minYear).max(maxYear).required().messages({
    'any.required': 'year is missing but it is required.',
    'number.integer': 'The year must be an integer.',
    'number.min': `The year must be at least ${minYear}.`,
    'number.max': `The year must be at most ${maxYear}.`,
    'number.base': 'The year must be an integer.'
  })
}).required().messages({
  'any.required': 'scheme object is missing but it is required.'
})
