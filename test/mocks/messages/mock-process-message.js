const { STATEMENT: STATEMENT_TYPE, SCHEDULE: SCHEDULE_TYPE } = require('../../../app/constants/document-types')

const STATEMENT = require('../mock-statement')
const { topUpSchedule: SCHEDULE } = require('../mock-schedule')

const BASE_SERVICE_BUS_MESSAGE = {
  _rawAmqpMessage: {}, // incomplete
  deliveryCount: 0,
  lockToken: 'cc5e2276-0c1b-4652-a37e-2ff9fb9f6d9f',
  body: undefined,
  applicationProperties: {},
  contentType: 'application/json',
  messageId: '19ef0822c0e44036a443e9cac4057b35',
  state: 'active',
  enqueuedSequenceNumber: 12,
  sequenceNumber: 12,
  enqueuedTimeUtc: new Date(2023, 0, 1, 12, 30),
  lockedUntilUtc: new Date(2023, 0, 1, 12, 31),
  expiresAtUtc: new Date(33197, 0, 1, 12, 30),
  deadLetterReason: undefined,
  deadLetterErrorDescription: undefined,
  delivery: {} // incomplete
}

const STATEMENT_MESSAGE = {
  ...BASE_SERVICE_BUS_MESSAGE,
  body: STATEMENT,
  applicationProperties: {
    type: STATEMENT_TYPE.type
  }
}

const SCHEDULE_MESSAGE = {
  ...BASE_SERVICE_BUS_MESSAGE,
  body: SCHEDULE,
  applicationProperties: {
    type: SCHEDULE_TYPE.type
  }
}

module.exports = {
  STATEMENT_MESSAGE,
  SCHEDULE_MESSAGE
}
