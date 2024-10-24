const schema = require('./schema')
const delinkedSchema = require('./delinked-schema')

const validatePublish = (publish, type) => {
  let result
  if (type === 'delinked-statement') {
    result = delinkedSchema.validate(publish, { abortEarly: false })
  } else {
    result = schema.validate(publish, { abortEarly: false })
  }

  if (result.error) {
    throw new Error(`${type} does not have the required details: ${result.error.message}`)
  }

  return result.value
}

module.exports = {
  validatePublish
}
