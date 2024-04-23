const Joi = require('joi')

const minSbi = 105000000
const maxSbi = 999999999
const minFrn = 1000000000
const maxFrn = 9999999999
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
  line1: Joi.string().optional().allow('', null),
  line2: Joi.string().optional().allow('', null),
  line3: Joi.string().optional().allow('', null),
  line4: Joi.string().optional().allow('', null),
  line5: Joi.string().optional().allow('', null),
  postcode: Joi.string().optional().allow('', null)
})

const schemeSchema = Joi.object({
  name: Joi.string().max(number100).required(),
  shortName: Joi.string().max(number10).required(),
  year: Joi.string().max(number10).required(),
  frequency: Joi.string().max(number10).required(),
  agreementNumber: Joi.number().integer().required()
})

const actionSchema = Joi.object({
  actionReference: Joi.number().required(),
  calculationReference: Joi.number().required(),
  fundingCode: Joi.string().max(number5).required(),
  groupName: Joi.string().max(number100).required(),
  actionCode: Joi.string().max(number5).required(),
  actionName: Joi.string().max(number100).required(),
  rate: Joi.string().max(number100).required(),
  landArea: Joi.string().max(number18).allow('', null).optional(),
  uom: Joi.string().max(number10).allow('', null).optional(),
  annualValue: Joi.string().max(number50).required(),
  quarterlyValue: Joi.string().max(number15).required(),
  overDeclarationPenalty: Joi.number().precision(number15).required(),
  quarterlyPaymentAmount: Joi.string().max(number15).required()
})

const actionGroupsSchema = Joi.object({
  groupName: Joi.string().max(number100).required(),
  actions: Joi.array().items(actionSchema).min(1).required()
})

module.exports = Joi.object({
  address: addressSchema,
  businessName: Joi.string().max(number100).required(),
  email: Joi.string().email().required(),
  frn: Joi.number().integer().min(minFrn).max(maxFrn).required(),
  sbi: Joi.number().integer().min(minSbi).max(maxSbi).required(),
  paymentReference: Joi.string().max(number30).required(),
  calculationId: Joi.number().integer().required(),
  paymentPeriod: Joi.string().max(number200).required(),
  paymentAmount: Joi.number().required(),
  transactionDate: Joi.date().required(),
  agreementNumber: Joi.number().integer().required(),
  calculationReference: Joi.number().integer().required(),
  claimReference: Joi.number().integer().required(),
  schemeCode: Joi.string().max(number50).required(),
  calculationDate: Joi.date().required(),
  invoiceNumber: Joi.string().max(number20).required(),
  agreementStart: Joi.date().required(),
  agreementEnd: Joi.date().required(),
  totalAdditionalPayments: Joi.number().precision(number15).required(),
  totalActionPayments: Joi.number().precision(number15).required(),
  totalPayments: Joi.number().precision(number15).required(),
  scheme: schemeSchema,
  actionGroups: Joi.array().items(actionGroupsSchema).min(1).required(),
  previousPaymentCount: Joi.number().integer().required(),
  documentReference: Joi.number().integer().required()
}).required()
