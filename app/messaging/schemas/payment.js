const Joi = require('joi')

module.exports = Joi.object({
  invoiceNumber: Joi.string().required(),
  reference: Joi.string().required(),
  dueDate: Joi.date().raw().required(),
  settled: Joi.string().required(),
  calculated: Joi.string().required(),
  value: Joi.number().required(),
  period: Joi.string().required()
})
