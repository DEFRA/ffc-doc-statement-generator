const Joi = require('joi')
const { STATEMENT } = require('../../constants/document-types')
const minSbi = 105000000
const maxSbi = 999999999
const minFrn = 1000000000
const maxFrn = 9999999999

module.exports = Joi.object({
  sbi: Joi.number().integer().min(minSbi).max(maxSbi).required(),
  frn: Joi.number().integer().min(minFrn).max(maxFrn).required(),
  apiLink: Joi.string().uri().required(),
  scheme: Joi.string().required(),
  documentType: Joi.string().required().allow(STATEMENT)
}).required()
