const styles = require('./styles')
const { generateContent } = require('./content')
const { A4 } = require('./page-sizes')
const { millimetresToPoints } = require('./conversion')

const getDocumentDefinition = (request, type) => {
  const topMargin = 5
  const sideMargin = 15
  return {
    pageSize: A4,
    content: generateContent(request, type),
    styles,
    defaultStyle: styles.default,
    pageMargins: [millimetresToPoints(sideMargin), millimetresToPoints(topMargin), millimetresToPoints(sideMargin), millimetresToPoints(topMargin)]
  }
}

module.exports = getDocumentDefinition
