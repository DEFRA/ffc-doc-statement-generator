const { Joi, constants, numberSchema, stringSchema, emailSchema } = require('../../utility/common-schema-fields')

const percentagePattern = /^\d{1,3}\.\d{2}$/
const monetaryPattern = /^\d+\.\d{2}$/

const createStringSchema = (name, chars, pattern) => stringSchema(name, chars, pattern)
const createEmailSchema = (name, chars) => emailSchema(name, chars)

const createProgressiveReductionSchema = (name) => Joi.string().pattern(monetaryPattern).required().messages({
  'string.base': `${name} should be a type of string`,
  'string.pattern.base': `${name} should adhere to the pattern ${monetaryPattern}`,
  'any.required': `The field ${name} is not present but it is required`
})

const createNumberSchemaWithMessages = (name, min, max) => Joi.number().integer().min(min).max(max).required().messages({
  'number.base': `${name} should be a type of number`,
  'number.integer': `${name} should be an integer`,
  'number.min': `${name} should have a minimum value of ${min}`,
  'number.max': `${name} should have a maximum value of ${max}`,
  'any.required': `The field ${name} is not present but it is required`
})

const createAddressSchema = (name) => Joi.string().allow(null, '').max(constants.number240).messages({
  'string.base': `${name} should be a type of string`,
  'string.max': `${name} should be no more than ${constants.number240} characters`
})

const paymentBands = {
  paymentBand1: createStringSchema('paymentBand1', constants.number4000),
  paymentBand2: createStringSchema('paymentBand2', constants.number4000),
  paymentBand3: createStringSchema('paymentBand3', constants.number4000),
  paymentBand4: createStringSchema('paymentBand4', constants.number4000)
}

const percentageReductions = {
  percentageReduction1: createStringSchema('percentageReduction1', null, percentagePattern),
  percentageReduction2: createStringSchema('percentageReduction2', null, percentagePattern),
  percentageReduction3: createStringSchema('percentageReduction3', null, percentagePattern),
  percentageReduction4: createStringSchema('percentageReduction4', null, percentagePattern)
}

const progressiveReductions = {
  progressiveReductions1: createProgressiveReductionSchema('progressiveReductions1'),
  progressiveReductions2: createProgressiveReductionSchema('progressiveReductions2'),
  progressiveReductions3: createProgressiveReductionSchema('progressiveReductions3'),
  progressiveReductions4: createProgressiveReductionSchema('progressiveReductions4')
}

module.exports = Joi.object({
  address: Joi.object({
    line1: createAddressSchema('line1'),
    line2: createAddressSchema('line2'),
    line3: createAddressSchema('line3'),
    line4: createAddressSchema('line4'),
    line5: createAddressSchema('line5'),
    postcode: createStringSchema('postcode', constants.number8)
  }),
  businessName: createStringSchema('businessName', constants.number160),
  email: createEmailSchema('email', 260),
  frn: createNumberSchemaWithMessages('frn', constants.minFrn, constants.maxFrn),
  sbi: createNumberSchemaWithMessages('sbi', constants.minSbi, constants.maxSbi),
  paymentReference: createStringSchema('paymentReference', constants.number30),
  calculationId: numberSchema('calculationId'),
  paymentPeriod: createStringSchema('paymentPeriod', constants.number200),
  paymentAmount: createStringSchema('paymentAmount', null, monetaryPattern),
  transactionDate: Joi.date().required().iso(),
  applicationId: numberSchema('applicationId'),
  ...paymentBands,
  ...percentageReductions,
  ...progressiveReductions,
  referenceAmount: createStringSchema('referenceAmount', null, monetaryPattern),
  totalProgressiveReduction: createStringSchema('totalProgressiveReduction', null, monetaryPattern),
  totalDelinkedPayment: createStringSchema('totalDelinkedPayment', null, monetaryPattern),
  paymentAmountCalculated: createStringSchema('paymentAmountCalculated', null, monetaryPattern),
  scheme: Joi.object({
    name: Joi.string().required().valid('Delinked Payment Statement').messages({
      'string.base': 'scheme name should be a type of string',
      'any.required': 'The field scheme name is not present but it is required',
      'any.only': 'Scheme name must be Delinked Payment Statement'
    }),
    shortName: Joi.string().required().valid('DP').messages({
      'string.base': 'scheme short name should be a type of string',
      'any.required': 'The field scheme short name is not present but it is required',
      'any.only': 'Scheme short name must be DP'
    }),
    year: Joi.number().integer().valid(2024, 2025).messages({
      'number.base': 'Year should be a type of number',
      'number.integer': 'Year should be an integer',
      'any.required': 'The field year is not present but it is required',
      'any.only': 'Year must be either 2024 or 2025'
    })
  }),
  previousPaymentCount: numberSchema('previousPaymentCount'),
  documentReference: numberSchema('documentReference'),
  excludedFromNotify: Joi.boolean().required().messages({
    'boolean.base': 'Excluded from notify must be a boolean',
    'any.required': 'Excluded from notify is required'
  })
})
