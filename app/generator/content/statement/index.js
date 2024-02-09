const { SHORT_NAMES } = require('../../../constants/scheme-names')
const { createContent: createSFIContent } = require('./SFI')
const { createContent: createSFIAContent } = require('./SFIA')

const createContent = (statement) => {
  switch (statement.scheme.shortName) {
    case SHORT_NAMES.SFI:
      return createSFIContent(statement)
    case SHORT_NAMES.SFIA:
      return createSFIAContent(statement)
    default:
      throw new Error(`Unknown Scheme Code: ${statement.scheme.shortName}`)
  }
}

module.exports = {
  createContent
}
