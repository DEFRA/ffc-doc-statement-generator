const Joi = require('joi')
const { STATEMENT } = require('../../constants/document-types')
const minSbi = 105000000
const maxSbi = 999999999
const minFrn = 1000000000
const maxFrn = 9999999999

module.exports = Joi.object({
  sbi: Joi.number().integer().min(minSbi).max(maxSbi).required().messages({
    'any.required': 'SBI is missing but it is required.',
    'number.base': 'SBI must be a number.',
    'number.integer': 'SBI must be an integer.',
    'number.min': `SBI must be at least ${minSbi}.`,
    'number.max': `SBI must be no more than ${maxSbi}.`
  }),
  frn: Joi.number().integer().min(minFrn).max(maxFrn).required().messages({
    'any.required': 'FRN is missing but it is required.',
    'number.base': 'FRN must be a number.',
    'number.integer': 'FRN must be an integer.',
    'number.min': `FRN must be at least ${minFrn}.`,
    'number.max': `FRN must be no more than ${maxFrn}.`
  }),
  apiLink: Joi.string().uri().required().messages({
    'any.required': 'API link is missing but it is required.',
    'string.base': 'API link must be a string.',
    'string.uri': 'API link must be a valid URI.'
  }),
  scheme: Joi.string().required().messages({
    'any.required': 'Scheme is missing but it is required.',
    'string.base': 'Scheme must be a string.'
  }),
  documentType: Joi.string().required().allow(STATEMENT).messages({
    'any.required': 'Document type is missing but it is required.',
    'string.base': 'Document type must be a string.',
    'any.only': `Document type must be "${STATEMENT}".`
  })
}).required().messages({
  'any.required': 'crm-schema object is missing, but it is required.'
})
