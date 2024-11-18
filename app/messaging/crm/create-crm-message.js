const schema = require('./crm-schema')
const { statementReceiverApiVersion, statementReceiverEndpoint } = require('../../config')
const { SHORT_NAMES } = require('../../constants/scheme-names')

const createCrmMessage = (statement, filename, type) => {
  const crm = {
    apiLink: `${statementReceiverEndpoint}/${statementReceiverApiVersion}/statements/statement/${filename}`,
    frn: statement.frn,
    sbi: statement.sbi,
    scheme: SHORT_NAMES[statement.scheme.shortName] || statement.scheme.shortName,
    documentType: type.name
  }

  const result = schema.validate(crm, {
    abortEarly: false
  })

  if (result.error) {
    throw new Error(`Invalid crm details for file ${statement.sbi}: ${result.error.message}`)
  }

  return {
    body: {
      ...crm
    },
    type: `uk.gov.doc.${type.id}.crm`,
    source: 'ffc-doc-statement-generator'
  }
}

module.exports = createCrmMessage
