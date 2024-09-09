const { A4 } = require('./page-sizes')
const style = require('./print-styles')
const { generateContent } = require('./content')
const { millimetresToPoints } = require('./conversion')
const leftMargin = 15
const topMargin = 5
const rightMargin = 15
const bottomMargin = 5

const getDocumentDefinition = (request, type) => {
  return {
    content: generateContent(request, type),
    pageSize: A4,
    pageMargins: [
      millimetresToPoints(leftMargin),
      millimetresToPoints(topMargin),
      millimetresToPoints(rightMargin),
      millimetresToPoints(bottomMargin)
    ],
    styles: style,
    defaultStyle: style.default
  }
}

module.exports = getDocumentDefinition
