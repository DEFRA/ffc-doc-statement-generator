const { Joi, constants, numberSchema, stringSchema, emailSchema } = require('../../utility/common-schema-fields')
const maxChars = 4000

const createStringSchema = (name) => stringSchema(name, maxChars)
const createEmailSchema = (name) => emailSchema(name)

const createProgressiveReductionSchema = (name) => Joi.string().allow(null).messages({
  'string.base': `${name} should be a type of string`
})

const createNumberSchemaWithMessages = (name, min, max) => Joi.number().integer().min(min).max(max).required().messages({
  'number.base': `${name} should be a type of number`,
  'number.integer': `${name} should be an integer`,
  'number.min': `${name} should have a minimum value of ${min}`,
  'number.max': `${name} should have a maximum value of ${max}`,
  'any.required': `The field ${name} is not present but it is required`
})

const createAddressSchema = (name) => Joi.string().allow(null, '').messages({
  'string.base': `${name} should be a type of string`
})

const paymentBands = {
  paymentBand1: createStringSchema('paymentBand1'),
  paymentBand2: createStringSchema('paymentBand2'),
  paymentBand3: createStringSchema('paymentBand3'),
  paymentBand4: createStringSchema('paymentBand4')
}

const percentageReductions = {
  percentageReduction1: createStringSchema('percentageReduction1'),
  percentageReduction2: createStringSchema('percentageReduction2'),
  percentageReduction3: createStringSchema('percentageReduction3'),
  percentageReduction4: createStringSchema('percentageReduction4')
}

const progressiveReductions = {
  progressiveReductions1: createProgressiveReductionSchema('progressiveReductions1'),
  progressiveReductions2: createProgressiveReductionSchema('progressiveReductions2'),
  progressiveReductions3: createProgressiveReductionSchema('progressiveReductions3'),
  progressiveReductions4: createProgressiveReductionSchema('progressiveReductions4')
}

const createShortNameSchema = (name) => Joi.string().valid('DP').required().messages({
  'string.base': `${name} should be a type of string`,
  'any.only': `${name} must be one of the allowed values`,
  'any.required': `The field ${name} is not present but it is required`
})

module.exports = Joi.object({
  address: Joi.object({
    line1: createAddressSchema('line1'),
    line2: createAddressSchema('line2'),
    line3: createAddressSchema('line3'),
    line4: createAddressSchema('line4'),
    line5: createAddressSchema('line5'),
    postcode: createStringSchema('postcode')
  }),
  businessName: createStringSchema('businessName'),
  email: createEmailSchema('email'),
  frn: createNumberSchemaWithMessages('frn', constants.minFrn, constants.maxFrn),
  sbi: createNumberSchemaWithMessages('sbi', constants.minSbi, constants.maxSbi),
  paymentReference: createStringSchema('paymentReference'),
  calculationId: numberSchema('calculationId'),
  paymentPeriod: createStringSchema('paymentPeriod'),
  paymentAmount: createStringSchema('paymentAmount'),
  transactionDate: Joi.date().iso(),
  applicationId: numberSchema('applicationId'),
  ...paymentBands,
  ...percentageReductions,
  ...progressiveReductions,
  referenceAmount: createStringSchema('referenceAmount'),
  totalProgressiveReduction: createStringSchema('totalProgressiveReduction'),
  totalDelinkedPayment: createStringSchema('totalDelinkedPayment'),
  paymentAmountCalculated: createStringSchema('paymentAmountCalculated'),
  scheme: Joi.object({
    name: createStringSchema('schemeName'),
    shortName: createShortNameSchema('schemeShortName'),
    year: numberSchema('schemeYear')
  }),
  previousPaymentCount: numberSchema('previousPaymentCount'),
  documentReference: numberSchema('documentReference')
})
