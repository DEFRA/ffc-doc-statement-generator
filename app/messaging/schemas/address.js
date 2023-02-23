const Joi = require('joi')

module.exports = Joi.object({
  line1: Joi.string().optional().allow('', null),
  line2: Joi.string().optional().allow('', null),
  line3: Joi.string().optional().allow('', null),
  line4: Joi.string().optional().allow('', null),
  line5: Joi.string().optional().allow('', null),
  postcode: Joi.string().optional().allow('', null)
}).required()
