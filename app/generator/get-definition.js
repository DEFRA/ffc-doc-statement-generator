const styles = require('./styles')
const generateContent = require('./content')
const { A4 } = require('./page-sizes')
const { millimetresToPoints } = require('./conversion')

const getDefinition = (statement) => {
  const topMargin = millimetresToPoints(5)
  const sideMargin = millimetresToPoints(15)
  return {
    pageSize: A4,
    content: generateContent(statement),
    styles,
    defaultStyle: styles.default,
    pageMargins: [sideMargin, topMargin, sideMargin, topMargin]
  }
}

module.exports = getDefinition
