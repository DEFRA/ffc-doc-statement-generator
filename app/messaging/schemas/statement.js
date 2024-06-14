const Joi = require('joi')

const businessName = require('./business-name')
const frn = require('./frn')
const sbi = require('./sbi')
const email = require('./email')
const address = require('./address')
const funding = require('./funding')
const payment = require('./payment')
const scheme = require('./scheme')
const documentReference = require('./document-reference')

module.exports = Joi.object({
  businessName,
  frn,
  sbi,
  email,
  address,
  scheme,
  documentReference,
  payments: Joi.array().items(payment).required().min(1).messages({
    'any.required': 'Statement payments array is missing, but is is required.',
    'array.base': 'The payments must be an array.',
    'array.min': 'There must be at least one payment.'
  }),
  funding: Joi.array().items(funding).required().min(2).has(funding.keys({ name: 'Total' }).required()).messages({
    'any.required': 'Statement funding array is missing, but is is required.',
    'array.base': 'The funding must be an array.',
    'array.min': 'There must be at least two funding items.',
    'array.includesRequiredUnknowns': 'The funding must include an item with the name "Total".'
  })
}).required().messages({
  'any.required': 'Statement object is missing, but is is required.'
})
