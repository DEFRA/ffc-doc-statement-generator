const Joi = require('joi')

const { IMMEDIATE, QUARTERLY } = require('../../constants/payment-types')

module.exports = Joi.object({
  order: Joi.number().required(),
  dueDate: Joi.date().optional().allow('', null),
  paymentType: Joi.string().valid(IMMEDIATE, QUARTERLY).required(),
  period: Joi.string().optional().allow('', null),
  value: Joi.number().required()
})
