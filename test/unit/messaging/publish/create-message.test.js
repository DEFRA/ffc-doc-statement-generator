const { mockMessageSender } = require('../../../mocks/modules/ffc-messaging')
jest.mock('../../../../app/messaging/publish/create-message')
const createMessage = require('../../../../app/messaging/publish/create-message')
jest.mock('../../../../app/messaging/create-alerts')
const { createAlerts } = require('../../../../app/messaging/create-alerts')

const sendPublishMessage = require('../../../../app/messaging/publish/send-publish-message')

const documentTypes = [
  {
    name: 'SFI23 statement',
    document: require('../../../mocks/messages/mock-process-message').SFI23QUARTERLYSTATEMENT_MESSAGE.body,
    filename: require('../../../mocks/components/filename').SFI23QUARTERLYSTATEMENT,
    type: require('../../../../app/constants/document-types').SFI23QUARTERLYSTATEMENT.id,
    messagePublish: require('../../../mocks/messages/publish').SFI23QUARTERLYSTATEMENT_MESSAGE
  },
  {
    name: 'delinked statement',
    document: require('../../../mocks/messages/mock-process-message').DELINKEDSTATEMENT_MESSAGE.body,
    filename: require('../../../mocks/components/filename').DELINKEDSTATEMENT,
    type: require('../../../../app/constants/document-types').DELINKED.id,
    messagePublish: require('../../../mocks/messages/publish').DELINKEDSTATEMENT_MESSAGE
  }
]

describe('sendPublishMessage', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe.each(documentTypes)('$name', ({ document, filename, type, messagePublish }) => {
    beforeEach(() => {
      createMessage.mockReturnValue(messagePublish)
    })

    test('should call createMessage with document, filename and type', async () => {
      await sendPublishMessage(document, filename, type)
      expect(createMessage).toHaveBeenCalledWith(document, filename, type)
      expect(createMessage).toHaveBeenCalledTimes(1)
    })

    test('should send message and close connection', async () => {
      await sendPublishMessage(document, filename, type)
      const sentMessage = mockMessageSender().sendMessage.mock.calls[0][0]

      // Check message properties
      expect(mockMessageSender().sendMessage).toHaveBeenCalledWith(createMessage())
      expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
      expect(sentMessage.body.filename).toBe(filename)
      expect(sentMessage.body.businessName).toBe(document.businessName)
      expect(sentMessage.body.frn).toBe(document.frn)
      expect(sentMessage.body.sbi).toBe(document.sbi)
      expect(sentMessage.body.address).toBe(document.address)
      expect(sentMessage.body.email).toBe(document.email)
      expect(sentMessage.body.scheme).toBe(document.scheme)
      expect(sentMessage.type).toBe(messagePublish.type)
      expect(sentMessage.source).toBe(messagePublish.source)

      // Close connection
      expect(mockMessageSender().closeConnection).toHaveBeenCalled()
      expect(mockMessageSender().closeConnection).toHaveBeenCalledTimes(1)
    })
  })
})

describe('errorHandling', () => {
  const error = new Error('Test error')
  let document, filename, type

  beforeEach(() => {
    document = {}
    filename = 'file.pdf'
    type = 'type'
    createMessage.mockImplementation(() => { throw error })
  })

  test('should call createAlerts and rethrow error', async () => {
    await expect(sendPublishMessage(document, filename, type)).rejects.toThrow('Test error')
    expect(createAlerts).toHaveBeenCalledWith([{ file: filename, message: error.message }])
  })
})
