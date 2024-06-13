const Joi = require('joi')

const { IMMEDIATE, QUARTERLY } = require('../../constants/payment-types')

module.exports = Joi.object({
  order: Joi.number().required().messages({
    'any.required': 'order is missing but it is required.',
    'number.base': 'The order must be a number.'
  }),
  dueDate: Joi.date().optional().allow('', null).messages({
    'date.base': 'The due date must be a date.'
  }),
  paymentType: Joi.string().valid(IMMEDIATE, QUARTERLY).required().messages({
    'any.required': 'paymentType is missing but it is required.',
    'string.base': 'The payment type must be a string.',
    'any.only': `The payment type must be either ${IMMEDIATE} or ${QUARTERLY}.`
  }),
  period: Joi.string().optional().allow('', null).messages({
    'string.base': 'The period must be a string.'
  }),
  value: Joi.number().required().messages({
    'any.required': 'value is missing but it is required.',
    'number.base': 'The value must be a number.'
  })
})
