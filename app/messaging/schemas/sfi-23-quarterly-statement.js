const Joi = require('joi')

const minSbi = 105000000
const maxSbi = 999999999
const minFrn = 1000000000
const maxFrn = 9999999999
const number4 = 4
const number5 = 5
const number10 = 10
const number15 = 15
const number18 = 18
const number20 = 20
const number30 = 30
const number50 = 50
const number100 = 100
const number200 = 200

const addressSchema = Joi.object({
  line1: Joi.string().optional().allow('', null).messages({
    'string.base': 'Line 1 must be a string'
  }),
  line2: Joi.string().optional().allow('', null).messages({
    'string.base': 'Line 2 must be a  string'
  }),
  line3: Joi.string().optional().allow('', null).messages({
    'string.base': 'Line 3 must be a string'
  }),
  line4: Joi.string().optional().allow('', null).messages({
    'string.base': 'Line 4 must be a string'
  }),
  line5: Joi.string().optional().allow('', null).messages({
    'string.base': 'Line 5 must be a string'
  }),
  postcode: Joi.string().optional().allow('', null).messages({
    'string.base': 'Postcode must be a string'
  })
})

const schemeSchema = Joi.object({
  name: Joi.string().max(number100).required().messages({
    'string.base': 'Scheme name must be a string',
    'string.max': 'Scheme name must be at most 100 characters',
    'any.required': 'Scheme name is not present but it is required'
  }),
  shortName: Joi.string().max(number10).required().messages({
    'string.base': 'Scheme short name must be a string',
    'string.max': 'Scheme short name must be at most 10 characters',
    'any.required': 'Scheme short name is not present but it is required'
  }),
  year: Joi.string().max(number4).required().messages({
    'string.base': 'Year must be a string',
    'string.max': 'Year must be at most 4 characters',
    'any.required': 'Year is not present but it is required'
  }),
  frequency: Joi.string().max(number10).required().messages({
    'string.base': 'Frequency must be a string',
    'string.max': 'Frequency must be at most 10 characters',
    'any.required': 'Frequency is not present but it is required'
  }),
  agreementNumber: Joi.number().integer().required().messages({
    'number.base': 'Agreement number must be a number',
    'number.integer': 'Agreement number must be an integer',
    'any.required': 'Agreement number is not present but it is required'
  })
})

const actionSchema = Joi.object({
  actionReference: Joi.number().required().messages({
    'number.base': 'Action reference must be a number',
    'any.required': 'Action reference is not present but it is required'
  }),
  calculationReference: Joi.number().required().messages({
    'number.base': 'Calculation reference must be a number',
    'any.required': 'Calculation reference is not present but it is required'
  }),
  fundingCode: Joi.string().max(number5).required().messages({
    'string.base': 'Funding code must be a string',
    'string.max': 'Funding code must be at most 5 characters',
    'any.required': 'Funding code is not present but it is required'
  }),
  groupName: Joi.string().max(number100).required().messages({
    'string.base': 'Group name must be a string',
    'string.max': 'Group name must be at most 100 characters',
    'any.required': 'Group name is not present but it is required'
  }),
  actionCode: Joi.string().max(number5).required().messages({
    'string.base': 'Action code must be a string',
    'string.max': 'Action code must be at most 5 characters',
    'any.required': 'Action code is not present but it is required'
  }),
  actionName: Joi.string().max(number100).required().messages({
    'string.base': 'Action name must be a string',
    'string.max': 'Action name must be at most 100 characters',
    'any.required': 'Action name is not present but it is required'
  }),
  rate: Joi.string().max(number100).required().messages({
    'string.base': 'Rate must be a string',
    'string.max': 'Rate must be at most 100 characters',
    'any.required': 'Rate is not present but it is required'
  }),
  landArea: Joi.string().max(number18).allow('', null).optional().messages({
    'string.base': 'Land area must be a string',
    'string.max': 'Land area must be at most 18 characters'
  }),
  uom: Joi.string().max(number10).allow('', null).optional().messages({
    'string.base': 'UOM must be a string',
    'string.max': 'UOM must be at most 10 characters'
  }),
  annualValue: Joi.string().max(number50).required().messages({
    'string.base': 'Annual value must be a string',
    'string.max': 'Annual value must be at most 50 characters',
    'any.required': 'Annual value is not present but it is required'
  }),
  quarterlyValue: Joi.string().max(number15).required().messages({
    'string.base': 'Quarterly value must be a string',
    'string.max': 'Quarterly value must be at most 15 characters',
    'any.required': 'Quarterly value is not present but it is required'
  }),
  overDeclarationPenalty: Joi.number().precision(number15).required().messages({
    'number.base': 'Over declaration penalty must be a number',
    'number.precision': 'Over declaration penalty must have at most 15 decimal places',
    'any.required': 'Over declaration penalty is not present but it is required'
  }),
  quarterlyPaymentAmount: Joi.string().max(number15).required().messages({
    'string.base': 'Quarterly payment amount must be a string',
    'string.max': 'Quarterly payment amount must be at most 15 characters',
    'any.required': 'Quarterly payment amount is not present but it is required'
  })
})

const actionGroupsSchema = Joi.object({
  groupName: Joi.string().max(number100).required().messages({
    'string.base': 'Group name must be a string',
    'string.max': 'Group name must be at most 100 characters',
    'any.required': 'Group name is not present but it is required'
  }),
  actions: Joi.array().items(actionSchema).min(1).required().messages({
    'array.base': 'Actions must be an array',
    'array.min': 'Actions array must have at least one item',
    'any.required': 'Actions array is not present but it is required'
  })
})

module.exports = Joi.object({
  address: addressSchema,
  businessName: Joi.string().max(number100).required().messages({
    'string.base': 'Business name must be a string',
    'string.max': 'Business name must be at most 100 characters',
    'any.required': 'Business name is not present but it is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is not present but it is required'
  }),
  frn: Joi.number().integer().min(minFrn).max(maxFrn).required().messages({
    'number.base': 'FRN must be a number',
    'number.integer': 'FRN must be an integer',
    'number.min': `FRN must be at least ${minFrn}`,
    'number.max': `FRN must be at most ${maxFrn}`,
    'any.required': 'FRN is not present but it is required'
  }),
  sbi: Joi.number().integer().min(minSbi).max(maxSbi).required().messages({
    'number.base': 'SBI must be a number',
    'number.integer': 'SBI must be an integer',
    'number.min': `SBI must be at least ${minSbi}`,
    'number.max': `SBI must be at most ${maxSbi}`,
    'any.required': 'SBI is not present but it is required'
  }),
  paymentReference: Joi.string().max(number30).required().messages({
    'string.base': 'Payment reference must be a string',
    'string.max': 'Payment reference must be at most 30 characters',
    'any.required': 'Payment reference is not present but it is required'
  }),
  calculationId: Joi.number().integer().required().messages({
    'number.base': 'Calculation ID must be a number',
    'number.integer': 'Calculation ID must be an integer',
    'any.required': 'Calculation ID is not present but it is required'
  }),
  paymentPeriod: Joi.string().max(number200).allow('', null).optional().messages({
    'string.base': 'Payment period must be a string',
    'string.max': 'Payment period must be at most 200 characters'
  }),
  paymentAmount: Joi.number().required().messages({
    'number.base': 'Payment amount must be a number',
    'any.required': 'Payment amount is not present but it is required'
  }),
  transactionDate: Joi.date().required().messages({
    'date.base': 'Transaction date must be a valid date',
    'any.required': 'Transaction date is not present but it is required'
  }),
  agreementNumber: Joi.number().integer().required().messages({
    'number.base': 'Agreement number must be a number',
    'number.integer': 'Agreement number must be an integer',
    'any.required': 'Agreement number is not present but it is required'
  }),
  calculationReference: Joi.number().integer().required().messages({
    'number.base': 'Calculation reference must be a number',
    'number.integer': 'Calculation reference must be an integer',
    'any.required': 'Calculation reference is not present but it is required'
  }),
  claimReference: Joi.number().integer().required().messages({
    'number.base': 'Claim reference must be a number',
    'number.integer': 'Claim reference must be an integer',
    'any.required': 'Claim reference is not present but it is required'
  }),
  schemeCode: Joi.string().max(number50).required().messages({
    'string.base': 'Scheme code must be a string',
    'string.max': 'Scheme code must be at most 50 characters',
    'any.required': 'Scheme code is not present but it is required'
  }),
  calculationDate: Joi.date().required().messages({
    'date.base': 'Calculation date must be a valid date',
    'any.required': 'Calculation date is not present but it is required'
  }),
  invoiceNumber: Joi.string().max(number20).required().messages({
    'string.base': 'Invoice number must be a string',
    'string.max': 'Invoice number must be at most 20 characters',
    'any.required': 'Invoice number is not present but it is required'
  }),
  agreementStart: Joi.date().required().messages({
    'date.base': 'Agreement start date must be a valid date',
    'any.required': 'Agreement start date is not present but it is required'
  }),
  agreementEnd: Joi.date().required().messages({
    'date.base': 'Agreement end date must be a valid date',
    'any.required': 'Agreement end date is not present but it is required'
  }),
  totalAdditionalPayments: Joi.number().precision(number15).required().messages({
    'number.base': 'Total additional payments must be a number',
    'number.precision': 'Total additional payments must have at most 15 decimal places',
    'any.required': 'Total additional payments are not present but they are required'
  }),
  totalActionPayments: Joi.number().precision(number15).required().messages({
    'number.base': 'Total action payments must be a number',
    'number.precision': 'Total action payments must have at most 15 decimal places',
    'any.required': 'Total action payments are not present but they are required'
  }),
  totalPayments: Joi.number().precision(number15).required().messages({
    'number.base': 'Total payments must be a number',
    'number.precision': 'Total payments must have at most 15 decimal places',
    'any.required': 'Total payments are not present but they are required'
  }),
  scheme: schemeSchema,
  actionGroups: Joi.array().items(actionGroupsSchema).min(1).required().messages({
    'array.base': 'Action groups must be an array',
    'array.min': 'Action groups array must have at least one item',
    'any.required': 'Action groups array is not present but it is required'
  }),
  previousPaymentCount: Joi.number().integer().required().messages({
    'number.base': 'Previous payment count must be a number',
    'number.integer': 'Previous payment count must be an integer',
    'any.required': 'Previous payment count is not present but it is required'
  }),
  documentReference: Joi.number().integer().required().messages({
    'number.base': 'Document reference must be a number',
    'number.integer': 'Document reference must be an integer',
    'any.required': 'Document reference is not present but it is required'
  })
}).required()
