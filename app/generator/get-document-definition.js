const { A4 } = require('./page-sizes')
const style = require('./print-styles')
const { generateContent } = require('./content')
const { millimetresToPoints } = require('./conversion')
const horizontalMargin = 15
const verticalMargin = 5

const getDocumentDefinition = async (request, type) => {
  return {
    content: await generateContent(request, type),
    pageSize: A4,
    pageMargins: [
      millimetresToPoints(horizontalMargin),
      millimetresToPoints(verticalMargin),
      millimetresToPoints(horizontalMargin),
      millimetresToPoints(verticalMargin)
    ],
    styles: style,
    defaultStyle: style.default
  }
}

module.exports = getDocumentDefinition
