const db = require('../data')

const saveLog = async (statementData, filename, dateGenerated) => {
  const {
    documentReference: documentRef,
    BusinessName,
    Frn,
    Sbi,
    AddressLine1,
    AddressLine2,
    AddressLine3,
    AddressLine4,
    AddressLine5,
    Postcode,
    Email,
    SchemeName,
    SchemeShortName,
    SchemeYear,
    SchemeFrequency,
    ...rest
  } = statementData

  return db.generation.create({
    statementData: rest,
    documentReference: documentRef,
    filename,
    dateGenerated,
    businessName: BusinessName,
    frn: Frn,
    sbi: Sbi,
    addressLine1: AddressLine1,
    addressLine2: AddressLine2,
    addressLine3: AddressLine3,
    addressLine4: AddressLine4,
    addressLine5: AddressLine5,
    postcode: Postcode,
    email: Email,
    schemeName: SchemeName,
    schemeShortName: SchemeShortName,
    schemeYear: SchemeYear,
    schemeFrequency: SchemeFrequency
  })
}

module.exports = saveLog
