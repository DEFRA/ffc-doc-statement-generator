const { mockMessageSender } = require('../../mocks/modules/ffc-messaging')

jest.mock('../../../app/messaging/publish/create-message')
const createMessage = require('../../../app/messaging/publish/create-message')
jest.mock('../../../app/messaging/create-alerts')
const { createAlerts } = require('../../../app/messaging/create-alerts')

const { SFI23QUARTERLYSTATEMENT, DELINKED } = require('../../../app/constants/document-types')

const { SFI23QUARTERLYSTATEMENT: SFI23QUARTERLYSTATEMENT_FILENAME, DELINKEDSTATEMENT } = require('../../mocks/components/filename')
const { SFI23QUARTERLYSTATEMENT_MESSAGE, DELINKEDSTATEMENT_MESSAGE } = require('../../mocks/messages/mock-process-message')
const { SFI23QUARTERLYSTATEMENT_MESSAGE: SFI23QUARTERLYSTATEMENT_MESSAGE_PUBLISH, DELINKEDSTATEMENT_MESSAGE: DELINKEDSTATEMENT_MESSAGE_PUBLISH } = require('../../mocks/messages/publish')

const sendPublishMessage = require('../../../app/messaging/publish/send-publish-message')

let document
let filename
let type

describe('send publish message', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const scenarios = [
    {
      name: 'sfi23 statement',
      documentMessage: SFI23QUARTERLYSTATEMENT_MESSAGE,
      filenameValue: SFI23QUARTERLYSTATEMENT_FILENAME,
      typeValue: SFI23QUARTERLYSTATEMENT.id,
      publishMessage: SFI23QUARTERLYSTATEMENT_MESSAGE_PUBLISH
    },
    {
      name: 'delinked statement',
      documentMessage: DELINKEDSTATEMENT_MESSAGE,
      filenameValue: DELINKEDSTATEMENT,
      typeValue: DELINKED.id,
      publishMessage: DELINKEDSTATEMENT_MESSAGE_PUBLISH
    }
  ]

  scenarios.forEach(({ name, documentMessage, filenameValue, typeValue, publishMessage }) => {
    describe(`when document is a ${name}`, () => {
      beforeEach(() => {
        document = documentMessage.body
        filename = filenameValue
        type = typeValue
        createMessage.mockReturnValue(publishMessage)
      })

      test.each([
        ['filename', () => filename],
        ['businessName', () => document.businessName],
        ['frn', () => document.frn],
        ['sbi', () => document.sbi],
        ['address', () => document.address],
        ['email', () => document.email],
        ['scheme', () => document.scheme],
        ['type', () => publishMessage.type],
        ['source', () => publishMessage.source]
      ])('should call mockMessageSender.sendMessage with body.%s', async (field, getExpected) => {
        await sendPublishMessage(document, filename, type)
        const expected = getExpected()
        if (['type', 'source'].includes(field)) {
          expect(mockMessageSender().sendMessage.mock.calls[0][0][field]).toBe(expected)
        } else {
          expect(mockMessageSender().sendMessage.mock.calls[0][0].body[field]).toBe(expected)
        }
      })
    })
  })
})

describe('error handling', () => {
  const error = new Error('Test error')
  beforeEach(() => {
    createMessage.mockImplementation(() => { throw error })
  })

  test('should call createAlerts with error details', async () => {
    await expect(sendPublishMessage(document, filename, type)).rejects.toThrow('Test error')
    expect(createAlerts).toHaveBeenCalledWith([{ file: filename, message: error.message }])
  })

  test('should rethrow the error', async () => {
    await expect(sendPublishMessage(document, filename, type)).rejects.toThrow('Test error')
  })
})
