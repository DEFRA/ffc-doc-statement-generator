const Joi = require('joi')

const businessName = require('../schemas/business-name')
const sbi = require('../schemas/sbi')
const frn = require('../schemas/frn')
const address = require('../schemas/address')
const email = require('../schemas/email')
const filename = require('../schemas/filename')
const scheme = require('../schemas/scheme')
const documentReference = require('../schemas/document-reference')
const type = require('../schemas/type')
const source = require('../schemas/source')

module.exports = Joi.object({
  body: Joi.object({
    businessName,
    sbi,
    frn,
    address,
    email,
    filename,
    scheme,
    documentReference
  }).required(),
  type,
  source
}).required()
  .messages({
    'object.base': 'The publish message must be an object.',
    'any.required': 'The publish message requires a message with a body.',
    '*': 'The publish message must be an object.'
  })
