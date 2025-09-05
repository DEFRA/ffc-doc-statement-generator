const Joi = require('joi')

const decimalPlaces = 2

const businessName = require('../schemas/business-name')
const sbi = require('../schemas/sbi')
const frn = require('../schemas/frn')
const address = require('../schemas/address')
const email = require('../schemas/email')
const filename = require('../schemas/filename')
const scheme = require('../schemas/delinked-scheme')
  .keys({
    year: Joi.number().integer().required()
      .custom((value, _helpers) => {
        return value.toString()
      })
  })
const documentReference = require('../schemas/document-reference')
const type = require('../schemas/type')
const source = require('../schemas/source')

const createMonetarySchema = (name) => Joi.number().required().precision(decimalPlaces).messages({
  'number.base': `${name} must be a number`,
  'number.precision': `${name} must have at most ${decimalPlaces} decimal places`,
  'any.required': `${name} is required`
})

const paymentBand1 = createMonetarySchema('paymentBand1')
const paymentBand2 = createMonetarySchema('paymentBand2')
const paymentBand3 = createMonetarySchema('paymentBand3')
const paymentBand4 = createMonetarySchema('paymentBand4')
const percentageReduction1 = createMonetarySchema('percentageReduction1')
const percentageReduction2 = createMonetarySchema('percentageReduction2')
const percentageReduction3 = createMonetarySchema('percentageReduction3')
const percentageReduction4 = createMonetarySchema('percentageReduction4')
const progressiveReductions1 = createMonetarySchema('progressiveReductions1')
const progressiveReductions2 = createMonetarySchema('progressiveReductions2')
const progressiveReductions3 = createMonetarySchema('progressiveReductions3')
const progressiveReductions4 = createMonetarySchema('progressiveReductions4')
const referenceAmount = createMonetarySchema('referenceAmount')
const totalProgressiveReduction = createMonetarySchema('totalProgressiveReduction')
const totalDelinkedPayment = createMonetarySchema('totalDelinkedPayment')
const paymentAmountCalculated = createMonetarySchema('paymentAmountCalculated')
const transactionDate = Joi.date().iso().required().messages({
  'date.base': 'transactionDate must be a valid date',
  'date.format': 'transactionDate must be in ISO 8601 date format',
  'any.required': 'transactionDate is required'
})

module.exports = Joi.object({
  body: Joi.object({
    email,
    documentReference,
    filename,
    businessName,
    frn,
    sbi,
    address,
    scheme,
    paymentBand1,
    paymentBand2,
    paymentBand3,
    paymentBand4,
    percentageReduction1,
    percentageReduction2,
    percentageReduction3,
    percentageReduction4,
    progressiveReductions1,
    progressiveReductions2,
    progressiveReductions3,
    progressiveReductions4,
    referenceAmount,
    totalProgressiveReduction,
    totalDelinkedPayment,
    paymentAmountCalculated,
    transactionDate
  }).required().messages({
    'object.base': 'The request body must be an object.',
    '*': 'Invalid data type for field {#label}'
  }),
  type,
  source
}).required().messages({
  'object.base': 'The publish message must be an object.',
  'any.required': 'The publish message requires a message with a body.',
  '*': 'The publish message must be an object.'
})
