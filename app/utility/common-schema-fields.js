const Joi = require('joi')

const constants = {
  minSbi: 105000000,
  maxSbi: 999999999,
  minFrn: 1000000000,
  maxFrn: 9999999999,
  number5: 5,
  number8: 8,
  number10: 10,
  number15: 15,
  number30: 30,
  number18: 18,
  number20: 20,
  number50: 50,
  number100: 100,
  number160: 160,
  number200: 200,
  number260: 260,
  number4000: 4000,
  year2024: 2024,
  year2025: 2025
}

const messages = {
  numberBase: (field) => `${field} should be a type of number`,
  integer: (field) => `${field} should be an integer`,
  required: (field) => `The field ${field} is not present but it is required`,
  stringBase: (field) => `${field} should be a type of string`,
  stringMax: (field, max) => `${field} should have a maximum length of ${max}`,
  dateBase: (field) => `${field} should be a valid date`,
  precision: (field, precision) => `${field} should not have more than ${precision} digits after the decimal point`,
  pattern: (field, pattern) => `${field} should adhere to the pattern ${pattern}`
}

const numberSchema = (field) => Joi.number().integer().required().messages({
  'number.base': messages.numberBase(field),
  'number.integer': messages.integer(field),
  'any.required': messages.required(field)
})

const stringSchema = (field, max, pattern) => {
  let schema = Joi.string().required().messages({
    'string.base': messages.stringBase(field),
    'any.required': messages.required(field)
  })
  if (pattern) {
    schema = schema.pattern(pattern).messages({
      'string.pattern.base': `${field} is not in the correct format`
    })
  }
  if (max !== undefined && !pattern) {
    schema = schema.max(max).messages({
      'string.max': messages.stringMax(field, max)
    })
  }
  return schema
}

const emailSchema = (field, max) => {
  let schema = Joi.string().optional().allow(null, '').messages({
    'string.base': messages.stringBase(field)
  })
  if (max !== undefined) {
    schema = schema.max(max).messages({
      'string.max': messages.stringMax(field, max)
    })
    return schema
  } else {
    return schema
  }
}

const dateSchema = (field) => Joi.date().required().messages({
  'date.base': messages.dateBase(field),
  'any.required': messages.required(field)
})

const precisionSchema = (field, precision) => Joi.number().precision(precision).required().messages({
  'number.base': messages.numberBase(field),
  'number.precision': messages.precision(field, precision),
  'any.required': messages.required(field)
})

module.exports = {
  Joi,
  constants,
  messages,
  numberSchema,
  stringSchema,
  emailSchema,
  dateSchema,
  precisionSchema
}
