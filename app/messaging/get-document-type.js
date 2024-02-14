const documentTypes = require('../constants/document-types')

const getDocumentType = (type) => {
  const documentType = Object.entries(documentTypes).map(x => x[1]).find(x => x.type === type)
  if (!documentType || !type) {
    throw new Error(`Unknown document type: ${type}`)
  }
  return documentType
}

module.exports = {
  getDocumentType
}
