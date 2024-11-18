const mapPublish = require('./map-publish')
const { validatePublish } = require('./validate-publish')

const createMessage = (document, filename, type) => {
  try {
    const mappedPublish = mapPublish(document, filename, type)

    const validatedPublish = validatePublish(mappedPublish, type)
    console.log('Validation successful:', validatedPublish)

    return validatedPublish
  } catch (error) {
    console.error('Error in createMessage:', error)
    throw error
  }
}

module.exports = createMessage
