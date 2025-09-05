const Joi = require('joi')

const maxAddressLineLength = 240
const maxPostcodeLength = 8

module.exports = Joi.object({
  line1: Joi.string().optional().allow('', null).max(maxAddressLineLength).messages({
    'string.base': 'line1 from address object must be a string',
    'string.max': `line1 from address object must be at most ${maxAddressLineLength} characters`
  }),
  line2: Joi.string().optional().allow('', null).max(maxAddressLineLength).messages({
    'string.base': 'line2 from address object must be a string',
    'string.max': `line2 from address object must be at most ${maxAddressLineLength} characters`
  }),
  line3: Joi.string().optional().allow('', null).max(maxAddressLineLength).messages({
    'string.base': 'line3 from address object must be a string',
    'string.max': `line3 from address object must be at most ${maxAddressLineLength} characters`
  }),
  line4: Joi.string().optional().allow('', null).max(maxAddressLineLength).messages({
    'string.base': 'line4 from address object must be a string',
    'string.max': `line4 from address object must be at most ${maxAddressLineLength} characters`
  }),
  line5: Joi.string().optional().allow('', null).max(maxAddressLineLength).messages({
    'string.base': 'line5 from address object must be a string',
    'string.max': `line5 from address object must be at most ${maxAddressLineLength} characters`
  }),
  postcode: Joi.string().optional().allow('', null).max(maxPostcodeLength).messages({
    'string.base': 'postcode from address object must be a string',
    'string.max': `postcode from address object must be at most ${maxPostcodeLength} characters`
  })
}).required()
