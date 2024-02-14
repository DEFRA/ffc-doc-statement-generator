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
  payments: Joi.array().items(payment).required().min(1),
  funding: Joi.array().items(funding).required().min(2).has(funding.keys({ name: 'Total' }).required())
}).required()
