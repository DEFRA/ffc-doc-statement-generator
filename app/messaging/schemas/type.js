const { STATEMENT, SCHEDULE, SFI23QUARTERLYSTATEMENT } = require('../../constants/document-types')

const Joi = require('joi')

const TYPES = [`uk.gov.doc.${STATEMENT.id}.publish`, `uk.gov.doc.${SCHEDULE.id}.publish`, `uk.gov.doc.${SFI23QUARTERLYSTATEMENT.id}.publish`]

module.exports = Joi.string().valid(...TYPES).required()
  .messages({
    'string.base': 'The type must be a string.',
    'any.only': `The type must be one of ${TYPES}.`,
    'any.required': 'The type is required.',
    '*': `The type must be a one of these strings must be one of ${TYPES}.`
  })
