const mapPublish = require('./map-publish')
const validatePublish = require('./validate-publish')

const createMessage = (document, filename, type) => {
  return validatePublish(mapPublish(document, filename, type), type)
}

module.exports = createMessage
