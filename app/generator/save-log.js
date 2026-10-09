const { generations } = require('../database')

const saveLog = async (statementData, filename, dateGenerated) => {
  const { documentReference: documentRef, ...data } = statementData

  const {
    businessName,
    frn,
    sbi,
    email,
    address,
    scheme
  } = data

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

  const [generation] = await generations()
    .insert({
      statementData: data,
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
    .returning('generationId')

  return generation
}

module.exports = saveLog
