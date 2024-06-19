const Joi = require('joi')

const minSbi = 105000000
const maxSbi = 999999999
const minFrn = 1000000000
const maxFrn = 9999999999
const maxSchemeNameLength = 100
const maxSchemeShortNameLength = 10
const maxYearLength = 4
const maxFrequencyLength = 10
const maxFundingCodeLength = 5
const maxGroupNameLength = 100
const maxActionCodeLength = 5
const maxActionNameLength = 100
const maxRateLength = 100
const maxLandAreaLength = 18
const maxUomLength = 10
const maxAnnualValueLength = 50
const maxQuarterlyValueLength = 15
const maxPaymentReferenceLength = 30
const maxSchemeCodeLength = 50
const maxInvoiceNumberLength = 20
const maxPaymentPeriodLength = 200
const maxDecimalPlaces = 15

const addressSchema = Joi.object({
  line1: Joi.string().optional().allow('', null).messages({
    'string.base': 'Line 1 must be a string'
  }),
  line2: Joi.string().optional().allow('', null).messages({
    'string.base': 'Line 2 must be a string'
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
  year: Joi.string().max(maxYearLength).required().messages({
    'string.base': 'Year must be a string',
    'string.max': `Year must be at most ${maxYearLength} characters`,
    'any.required': 'Year is required'
  }),
  frequency: Joi.string().max(maxFrequencyLength).required().messages({
    'string.base': 'Frequency must be a string',
    'string.max': `Frequency must be at most ${maxFrequencyLength} characters`,
    'any.required': 'Frequency is required'
  }),
  agreementNumber: Joi.number().integer().required().messages({
    'number.base': 'Agreement number must be a number',
    'number.integer': 'Agreement number must be an integer',
    'any.required': 'Agreement number is required'
  })
})

const actionSchema = Joi.object({
  actionReference: Joi.number().required().messages({
    'number.base': 'Action reference must be a number',
    'any.required': 'Action reference is required'
  }),
  calculationReference: Joi.number().required().messages({
    'number.base': 'Calculation reference must be a number',
    'any.required': 'Calculation reference is required'
  }),
  fundingCode: Joi.string().max(maxFundingCodeLength).required().messages({
    'string.base': 'Funding code must be a string',
    'string.max': `Funding code must be at most ${maxFundingCodeLength} characters`,
    'any.required': 'Funding code is required'
  }),
  groupName: Joi.string().max(maxGroupNameLength).required().messages({
    'string.base': 'Group name must be a string',
    'string.max': `Group name must be at most ${maxGroupNameLength} characters`,
    'any.required': 'Group name is required'
  }),
  actionCode: Joi.string().max(maxActionCodeLength).required().messages({
    'string.base': 'Action code must be a string',
    'string.max': `Action code must be at most ${maxActionCodeLength} characters`,
    'any.required': 'Action code is required'
  }),
  actionName: Joi.string().max(maxActionNameLength).required().messages({
    'string.base': 'Action name must be a string',
    'string.max': `Action name must be at most ${maxActionNameLength} characters`,
    'any.required': 'Action name is required'
  }),
  rate: Joi.string().max(maxRateLength).required().messages({
    'string.base': 'Rate must be a string',
    'string.max': `Rate must be at most ${maxRateLength} characters`,
    'any.required': 'Rate is required'
  }),
  landArea: Joi.string().max(maxLandAreaLength).allow('', null).optional().messages({
    'string.base': 'Land area must be a string',
    'string.max': `Land area must be at most ${maxLandAreaLength} characters`
  }),
  uom: Joi.string().max(maxUomLength).allow('', null).optional().messages({
    'string.base': 'UOM must be a string',
    'string.max': `UOM must be at most ${maxUomLength} characters`
  }),
  annualValue: Joi.string().max(maxAnnualValueLength).required().messages({
    'string.base': 'Annual value must be a string',
    'string.max': `Annual value must be at most ${maxAnnualValueLength} characters`,
    'any.required': 'Annual value is required'
  }),
  quarterlyValue: Joi.string().max(maxQuarterlyValueLength).required().messages({
    'string.base': 'Quarterly value must be a string',
    'string.max': `Quarterly value must be at most ${maxQuarterlyValueLength} characters`,
    'any.required': 'Quarterly value is required'
  }),
  overDeclarationPenalty: Joi.number().precision(maxDecimalPlaces).required().messages({
    'number.base': 'Over declaration penalty must be a number',
    'number.precision': `Over declaration penalty must have at most ${maxDecimalPlaces} decimal places`,
    'any.required': 'Over declaration penalty is required'
  }),
  quarterlyPaymentAmount: Joi.string().max(maxQuarterlyValueLength).required().messages({
    'string.base': 'Quarterly payment amount must be a string',
    'string.max': `Quarterly payment amount must be at most ${maxQuarterlyValueLength} characters`,
    'any.required': 'Quarterly payment amount is required'
  })
})

const actionGroupsSchema = Joi.object({
  groupName: Joi.string().max(maxGroupNameLength).required().messages({
    'string.base': 'Group name must be a string',
    'string.max': `Group name must be at most ${maxGroupNameLength} characters`,
    'any.required': 'Group name is required'
  }),
  actions: Joi.array().items(actionSchema).min(1).required().messages({
    'array.base': 'Actions must be an array',
    'array.min': 'Actions array must have at least one item',
    'any.required': 'Actions array is required'
  })
})

module.exports = Joi.object({
  address: addressSchema,
  businessName: Joi.string().max(maxSchemeNameLength).required().messages({
    'string.base': 'Business name must be a string',
    'string.max': `Business name must be at most ${maxSchemeNameLength} characters`,
    'any.required': 'Business name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required'
  }),
  frn: Joi.number().integer().min(minFrn).max(maxFrn).required().messages({
    'number.base': 'FRN must be a number',
    'number.integer': 'FRN must be an integer',
    'number.min': `FRN must be at least ${minFrn}`,
    'number.max': `FRN must be at most ${maxFrn}`,
    'any.required': 'FRN is required'
  }),
  sbi: Joi.number().integer().min(minSbi).max(maxSbi).required().messages({
    'number.base': 'SBI must be a number',
    'number.integer': 'SBI must be an integer',
    'number.min': `SBI must be at least ${minSbi}`,
    'number.max': `SBI must be at most ${maxSbi}`,
    'any.required': 'SBI is required'
  }),
  paymentReference: Joi.string().max(maxPaymentReferenceLength).required().messages({
    'string.base': 'Payment reference must be a string',
    'string.max': `Payment reference must be at most ${maxPaymentReferenceLength} characters`,
    'any.required': 'Payment reference is required'
  }),
  calculationId: Joi.number().integer().required().messages({
    'number.base': 'Calculation ID must be a number',
    'number.integer': 'Calculation ID must be an integer',
    'any.required': 'Calculation ID is required'
  }),
  paymentPeriod: Joi.string().max(maxPaymentPeriodLength).required().messages({
    'string.base': 'Payment period must be a string',
    'string.max': `Payment period must be at most ${maxPaymentPeriodLength} characters`,
    'any.required': 'Payment period is required'
  }),
  agreementNumber: Joi.number().integer().required().messages({
    'number.base': 'Agreement number must be a number',
    'number.integer': 'Agreement number must be an integer',
    'any.required': 'Agreement number is required'
  }),
  calculationReference: Joi.number().integer().required().messages({
    'number.base': 'Calculation reference must be a number',
    'number.integer': 'Calculation reference must be an integer',
    'any.required': 'Calculation reference is required'
  }),
  claimReference: Joi.number().integer().required().messages({
    'number.base': 'Claim reference must be a number',
    'number.integer': 'Claim reference must be an integer',
    'any.required': 'Claim reference is required'
  }),
  schemeCode: Joi.string().max(maxSchemeCodeLength).required().messages({
    'string.base': 'Scheme code must be a string',
    'string.max': `Scheme code must be at most ${maxSchemeCodeLength} characters`,
    'any.required': 'Scheme code is required'
  }),
  calculationDate: Joi.date().required().messages({
    'date.base': 'Calculation date must be a valid date',
    'any.required': 'Calculation date is required'
  }),
  invoiceNumber: Joi.string().max(maxInvoiceNumberLength).required().messages({
    'string.base': 'Invoice number must be a string',
    'string.max': `Invoice number must be at most ${maxInvoiceNumberLength} characters`,
    'any.required': 'Invoice number is required'
  }),
  agreementStart: Joi.date().required().messages({
    'date.base': 'Agreement start date must be a valid date',
    'any.required': 'Agreement start date is required'
  }),
  agreementEnd: Joi.date().required().messages({
    'date.base': 'Agreement end date must be a valid date',
    'any.required': 'Agreement end date is required'
  }),
  totalAdditionalPayments: Joi.number().precision(maxDecimalPlaces).required().messages({
    'number.base': 'Total additional payments must be a number',
    'number.precision': `Total additional payments must have at most ${maxDecimalPlaces} decimal places`,
    'any.required': 'Total additional payments are required'
  }),
  totalActionPayments: Joi.number().precision(maxDecimalPlaces).required().messages({
    'number.base': 'Total action payments must be a number',
    'number.precision': `Total action payments must have at most ${maxDecimalPlaces} decimal places`,
    'any.required': 'Total action payments are required'
  }),
  totalPayments: Joi.number().precision(maxDecimalPlaces).required().messages({
    'number.base': 'Total payments must be a number',
    'number.precision': `Total payments must have at most ${maxDecimalPlaces} decimal places`,
    'any.required': 'Total payments are required'
  }),
  scheme: schemeSchema,
  actionGroups: Joi.array().items(actionGroupsSchema).min(1).required().messages({
    'array.base': 'Action groups must be an array',
    'array.min': 'Action groups array must have at least one item',
    'any.required': 'Action groups array is required'
  }),
  previousPaymentCount: Joi.number().integer().required().messages({
    'number.base': 'Previous payment count must be a number',
    'number.integer': 'Previous payment count must be an integer',
    'any.required': 'Previous payment count is required'
  }),
  documentReference: Joi.number().integer().required().messages({
    'number.base': 'Document reference must be a number',
    'number.integer': 'Document reference must be an integer',
    'any.required': 'Document reference is required'
  })
}).required()
