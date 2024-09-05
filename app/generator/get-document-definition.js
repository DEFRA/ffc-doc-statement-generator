const styles = require('./print-styles')
const { generateContent } = require('./content')
const { A4 } = require('./page-sizes')

const getDocumentDefinition = (request, type) => {
  return {
    pageSize: A4,
    content: generateContent(request, type),
    styles,
    defaultStyle: styles.default
  }
}

module.exports = getDocumentDefinition
