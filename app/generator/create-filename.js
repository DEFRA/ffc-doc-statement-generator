const { STATEMENT, SCHEDULE } = require('../constants/document-types')
const { schemeShortName, schemeYear, frn, timestampRegex } = require('../constants/filenameRegex')

const createFilename = (statement, timestamp, type) => {
  const prefix = getPrefix(type)
  const schemeTest = schemeShortName.test(statement.scheme.shortName)
  if (!schemeTest) {
    throw new Error('invalid short name')
  }
  const schemeYearTest = schemeYear.test(statement.scheme.year)
  if (!schemeYearTest) {
    throw new Error('invalid scheme year')
  }
  const frnTest = frn.test(statement.frn)
  if (!frnTest) {
    throw new Error('invalid frn number')
  }
  const timeTest = timestampRegex.test(timestamp)
  if (!timeTest) {
    throw new Error('invalid timestamp')
  }
  const filename = `FFC_Payment${prefix}_${statement.scheme.shortName}_${statement.scheme.year}_${statement.frn}_${timestamp}.pdf`.replace(/\s/g, '')
  return filename
}

const getPrefix = (type) => {
  switch (type) {
    case STATEMENT:
      return 'Statement'
    case SCHEDULE:
      return 'Schedule'
    default:
      return 'Document'
  }
}

module.exports = createFilename
