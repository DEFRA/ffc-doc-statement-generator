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

const testDocumentProperties = ['filename', 'businessName', 'frn', 'sbi', 'address', 'email', 'scheme']
const senderMethods = [
  ['sendMessage', 'toHaveBeenCalled'],
  ['sendMessage', 'toHaveBeenCalledTimes', 1],
  ['sendMessage', 'toHaveBeenCalledWith', () => createMessage()],
  ['closeConnection', 'toHaveBeenCalled'],
  ['closeConnection', 'toHaveBeenCalledTimes', 1]
]

const createMessageTests = [
  ['should call createMessage', 'toHaveBeenCalled'],
  ['should call createMessage once', 'toHaveBeenCalledTimes', 1],
  ['should call createMessage with document, filename and type', 'toHaveBeenCalledWith', (doc, file, t) => [doc, file, t]]
]

function runSharedPublishTests() {
  test.each(createMessageTests)('%s', async (_, matcher, args) => {
    await sendPublishMessage(document, filename, type)
    const callArgs = typeof args === 'function' ? args(document, filename, type) : args
    expect(createMessage)[matcher](callArgs)
  })

  test.each(testDocumentProperties)('should call mockMessageSender.sendMessage with body.%s', async (prop) => {
    await sendPublishMessage(document, filename, type)
    expect(mockMessageSender().sendMessage.mock.calls[0][0].body[prop]).toBe(prop === 'filename' ? filename : document[prop])
  })

  test.each(senderMethods)('%s', async (method, matcher, arg) => {
    await sendPublishMessage(document, filename, type)
    const target = mockMessageSender()[method]
    const callArg = typeof arg === 'function' ? arg() : arg
    expect(target)[matcher](callArg)
  })
}

describe('send publish message', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when document is an sfi23 statement', () => {
    beforeEach(() => {
      document = SFI23QUARTERLYSTATEMENT_MESSAGE.body
      filename = SFI23QUARTERLYSTATEMENT_FILENAME
      type = SFI23QUARTERLYSTATEMENT.id

      createMessage.mockReturnValue(SFI23QUARTERLYSTATEMENT_MESSAGE_PUBLISH)
    })

    runSharedPublishTests()
  })

  describe('when document is a delinked statement', () => {
    beforeEach(() => {
      document = DELINKEDSTATEMENT_MESSAGE.body
      filename = DELINKEDSTATEMENT
      type = DELINKED.id

      createMessage.mockReturnValue(DELINKEDSTATEMENT_MESSAGE_PUBLISH)
    })

    runSharedPublishTests()
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
