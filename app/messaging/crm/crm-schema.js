const Joi = require('joi')
const { STATEMENT } = require('../../constants/document-types')

module.exports = Joi.object({
  sbi: Joi.number().integer().min(105000000).max(999999999).required(),
  frn: Joi.number().integer().min(1000000000).max(9999999999).required(),
  apiLink: Joi.string().uri().required(),
  scheme: Joi.string().required(),
  documentType: Joi.string().required().allow(STATEMENT)
}).required()
