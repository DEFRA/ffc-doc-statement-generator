const { A4 } = require('./page-sizes')
const style = require('./print-styles')
const { generateContent } = require('./content')
const { millimetresToPoints } = require('./conversion')

const getDocumentDefinition = (request, type) => {
  return {
    content: generateContent(request, type),
    pageSize: A4,
    pageMargins: [
      millimetresToPoints(15), // Left
      millimetresToPoints(5), // Top
      millimetresToPoints(15), // Right
      millimetresToPoints(5) // Bottom
    ],
    styles: style,
    defaultStyle: style.default
  }
}

module.exports = getDocumentDefinition
