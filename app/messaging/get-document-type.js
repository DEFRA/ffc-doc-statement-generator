const documentTypes = require('../constants/document-types')

const getDocumentType = (type, bodyType) => {
  const typeToUse = type || bodyType

  const documentType = Object.entries(documentTypes).map(x => x[1]).find(x => x.type === typeToUse)
  if (!documentType || !typeToUse) {
    throw new Error(`Unknown document type: ${typeToUse}`)
  }
  return documentType
}

module.exports = {
  getDocumentType
}
