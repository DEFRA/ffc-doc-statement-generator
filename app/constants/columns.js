const TABLES = require('./tables')

const PRIMARY_KEYS = {
  [TABLES.generations]: 'generationId',
  [TABLES.noNotifys]: 'noNotifyId',
  [TABLES.outbox]: 'outboxId'
}

const COLUMNS = {
  [TABLES.generations]: [
    'generationId',
    'statementData',
    'dateGenerated',
    'filename',
    'documentReference',
    'businessName',
    'frn',
    'sbi',
    'addressLine1',
    'addressLine2',
    'addressLine3',
    'addressLine4',
    'addressLine5',
    'postcode',
    'email',
    'schemeName',
    'schemeShortName',
    'schemeYear',
    'schemeFrequency'
  ],
  [TABLES.noNotifys]: [
    'noNotifyId',
    'frn',
    'claimId',
    'agreementNumber'
  ],
  [TABLES.outbox]: [
    'outboxId',
    'generationId',
    'type',
    'startProcessing',
    'published',
    'sentToPublisher',
    'sentToCRM',
    'receiverLink'
  ]
}

const pickColumns = (record, table) => {
  return Object.fromEntries(
    Object.entries(record)
      .filter(([column]) => COLUMNS[table].includes(column))
      .filter(([column]) => column !== PRIMARY_KEYS[table])
  )
}

module.exports = {
  PRIMARY_KEYS,
  COLUMNS,
  pickColumns
}
