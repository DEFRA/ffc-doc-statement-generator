const schema = require('./schema')

const validatePublish = (publish, type) => {
  const result = schema.validate(publish, {
    abortEarly: false
  })

  if (result.error) {
    throw new Error(`${type} does not have the required details: ${result.error.message}`)
  }

  return result.value
}

module.exports = validatePublish
