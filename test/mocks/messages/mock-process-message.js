const { SFI23QUARTERLYSTATEMENT: SFI23QUARTERLYSTATEMENT_TYPE, DELINKED: DELINKED_TYPE } = require('../../../app/constants/document-types')

const SFI23QUARTERLYSTATEMENT = require('../mock-statement-sfi23-quarterly')
const DELINKEDSTATEMENT = require('../mock-delinked-statement')

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

const SFI23QUARTERLYSTATEMENT_MESSAGE = {
  ...BASE_SERVICE_BUS_MESSAGE,
  body: SFI23QUARTERLYSTATEMENT,
  applicationProperties: {
    type: SFI23QUARTERLYSTATEMENT_TYPE.type
  }
}

const DELINKEDSTATEMENT_MESSAGE = {
  ...BASE_SERVICE_BUS_MESSAGE,
  body: DELINKEDSTATEMENT,
  applicationProperties: {
    type: DELINKED_TYPE.type
  }
}

module.exports = {
  SFI23QUARTERLYSTATEMENT_MESSAGE,
  DELINKEDSTATEMENT_MESSAGE
}
