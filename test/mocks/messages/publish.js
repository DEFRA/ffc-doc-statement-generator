const MESSAGE_SOURCE = require('../../../app/constants/message-source')
const { STATEMENT: STATEMENT_TYPE, SCHEDULE: SCHEDULE_TYPE } = require('../../../app/constants/document-types')

const { STATEMENT: STATEMENT_FILENAME, SCHEDULE: SCHEDULE_FILENAME } = require('../components/filename')

const STATEMENT = require('../mock-statement')
const { topUpSchedule: SCHEDULE } = require('../mock-schedule')

const BASE_MESSAGE = {
  body: {},
  type: null,
  source: MESSAGE_SOURCE
}

const STATEMENT_MESSAGE = {
  ...BASE_MESSAGE,
  body: {
    businessName: STATEMENT.businessName,
    sbi: STATEMENT.sbi,
    frn: STATEMENT.frn,
    address: STATEMENT.address,
    email: STATEMENT.email,
    filename: STATEMENT_FILENAME,
    scheme: STATEMENT.scheme,
    documentReference: STATEMENT?.documentReference ?? null
  },
  type: `uk.gov.doc.${STATEMENT_TYPE.id}.publish`
}

const SCHEDULE_MESSAGE = {
  ...BASE_MESSAGE,
  body: {
    businessName: SCHEDULE.businessName,
    sbi: SCHEDULE.sbi,
    frn: SCHEDULE.frn,
    address: SCHEDULE.address,
    email: SCHEDULE.email,
    filename: SCHEDULE_FILENAME,
    scheme: SCHEDULE.scheme,
    documentReference: SCHEDULE?.documentReference ?? null
  },
  type: `uk.gov.doc.${SCHEDULE_TYPE.id}.publish`
}

module.exports = {
  STATEMENT_MESSAGE,
  SCHEDULE_MESSAGE
}
