const styles = require('./styles')
const { generateContent } = require('./content')
const { A4 } = require('./page-sizes')
const { millimetresToPoints } = require('./conversion')

const getDocumentDefinition = (request, type) => {
  const topMargin = millimetresToPoints(5)
  const sideMargin = millimetresToPoints(15)
  return {
    pageSize: A4,
    content: generateContent(request, type),
    styles,
    defaultStyle: styles.default,
    pageMargins: [sideMargin, topMargin, sideMargin, topMargin]
  }
}

module.exports = getDocumentDefinition
