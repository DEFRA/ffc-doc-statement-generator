const db = require('../data')

const saveLog = async (statementData, filename, dateGenerated) => {
  const {
    documentReference: documentRef,
    businessName,
    frn,
    sbi,
    email,
    address,
    scheme,
    ...rest
  } = statementData

  const {
    line1: addressLine1,
    line2: addressLine2,
    line3: addressLine3,
    line4: addressLine4,
    line5: addressLine5,
    postcode
  } = address || {}

  const {
    name: schemeName,
    shortName: schemeShortName,
    year: schemeYear,
    frequency: schemeFrequency
  } = scheme || {}

  return db.generation.create({
    statementData,
    documentReference: documentRef,
    filename,
    dateGenerated,
    businessName,
    frn,
    sbi,
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    addressLine5,
    postcode,
    email,
    schemeName,
    schemeShortName,
    schemeYear,
    schemeFrequency
  })
}

module.exports = saveLog
