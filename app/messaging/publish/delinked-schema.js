const Joi = require('joi')

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
const paymentPeriod = require('../schemas/payment-period')
const type = require('../schemas/type')
const source = require('../schemas/source')
const paymentBand1 = Joi.number().required()
const paymentBand2 = Joi.number().required()
const paymentBand3 = Joi.number().required()
const paymentBand4 = Joi.number().required()
const percentageReduction1 = Joi.number().required()
const percentageReduction2 = Joi.number().required()
const percentageReduction3 = Joi.number().required()
const percentageReduction4 = Joi.number().required()
const progressiveReductions1 = Joi.number().required()
const progressiveReductions2 = Joi.number().required()
const progressiveReductions3 = Joi.number().required()
const progressiveReductions4 = Joi.number().required()
const referenceAmount = Joi.number().required()
const totalProgressiveReduction = Joi.number().required()
const totalDelinkedPayment = Joi.number().required()
const paymentAmountCalculated = Joi.number().required()

module.exports = Joi.object({
  body: Joi.object({
    businessName,
    sbi,
    frn,
    address,
    email,
    filename,
    scheme,
    documentReference,
    paymentPeriod,
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
    paymentAmountCalculated
  }).required(),
  type,
  source
}).required()
  .messages({
    'object.base': 'The publish message must be an object.',
    'any.required': 'The publish message requires a message with a body.',
    '*': 'The publish message must be an object.'
  })
