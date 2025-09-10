const Joi = require('joi')

const maxPaymentPeriod = 200
const percentagePattern = /^\d{1,3}\.\d{2}$/
const monetaryPattern = /^\d+\.\d{2}$/

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
const { stringSchema, constants } = require('../../utility/common-schema-fields')

const createMonetarySchema = (name) => Joi.string().pattern(monetaryPattern).required().messages({
  'string.base': `${name} should be a type of string`,
  'string.pattern.base': `${name} should adhere to the pattern ${monetaryPattern}`,
  'any.required': `The field ${name} is not present but it is required`
})

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
    paymentBand1: stringSchema('paymentBand1', constants.number4000),
    paymentBand2: stringSchema('paymentBand2', constants.number4000),
    paymentBand3: stringSchema('paymentBand3', constants.number4000),
    paymentBand4: stringSchema('paymentBand4', constants.number4000),
    percentageReduction1: stringSchema('percentageReduction1', null, percentagePattern),
    percentageReduction2: stringSchema('percentageReduction2', null, percentagePattern),
    percentageReduction3: stringSchema('percentageReduction3', null, percentagePattern),
    percentageReduction4: stringSchema('percentageReduction4', null, percentagePattern),
    progressiveReductions1,
    progressiveReductions2,
    progressiveReductions3,
    progressiveReductions4,
    referenceAmount,
    totalProgressiveReduction,
    totalDelinkedPayment,
    paymentAmountCalculated,
    paymentPeriod: Joi.string().max(maxPaymentPeriod).required().messages({
      'string.base': 'Payment period must be a string',
      'string.max': `Payment period must be at most ${maxPaymentPeriod} characters`,
      'any.required': 'Payment period is required'
    }),
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
