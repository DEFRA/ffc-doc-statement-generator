const Joi = require('joi')
const address = require('./address')
const funding = require('./funding')
const payment = require('./payment')
const scheme = require('./scheme')

module.exports = Joi.object({
  businessName: Joi.string().required(),
  frn: Joi.number().integer().min(1000000000).max(9999999999).required(),
  sbi: Joi.number().integer().min(105000000).max(999999999).required(),
  email: Joi.string().optional().allow('', null),
  address,
  scheme,
  payments: Joi.array().items(payment).required().min(1),
  funding: Joi.array().items(funding).required().min(2).has(funding.keys({ name: 'Total' }).required())
}).required()
