const Joi = require('joi')

module.exports = Joi.object({
  invoiceNumber: Joi.string().required().messages({
    'any.required': 'invoiceNumber is missing but it is required.',
    'string.base': 'The invoice number must be a string.'
  }),
  reference: Joi.string().required().messages({
    'any.required': 'reference is missing but it is required.',
    'string.base': 'The reference must be a string.'
  }),
  dueDate: Joi.date().raw().required().messages({
    'any.required': 'dueDateis missing but it is required.',
    'date.base': 'The due date must be a date.'
  }),
  settled: Joi.string().required().messages({
    'any.required': 'settled is missing but it is required.',
    'string.base': 'The settled status must be a string.'
  }),
  calculated: Joi.string().required().messages({
    'any.required': 'calculated is missing but it is required.',
    'string.base': 'The calculated status must be a string.'
  }),
  value: Joi.number().required().messages({
    'any.required': 'value is missing but it is required.',
    'number.base': 'The value must be a number.'
  }),
  period: Joi.string().required().messages({
    'any.required': 'period is missing but it is required.',
    'string.base': 'The period must be a string.'
  })
})
