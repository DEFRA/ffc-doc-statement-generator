const schema = require('./schemas/statement')
const { VALIDATION } = require('../errors')

const validateStatement = (statement) => {
  const validationResult = schema.validate(statement, { abortEarly: false, allowUnknown: true })
  if (validationResult.error) {
    const error = new Error(`Statement content is invalid, ${validationResult.error.message}`)
    error.category = VALIDATION
    throw error
  }
}

module.exports = validateStatement
