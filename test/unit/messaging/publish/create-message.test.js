jest.mock('../../../../app/config', () => ({ publishTopic: { address: 'test-publish-topic' } }))
jest.mock('../../../../app/messaging/service-bus', () => ({
  getSender: jest.fn(),
  sendMessage: jest.fn(),
  closeSender: jest.fn()
}))
jest.mock('../../../../app/messaging/publish/create-message')
const createMessage = require('../../../../app/messaging/publish/create-message')
jest.mock('../../../../app/messaging/create-alerts', () => ({ createAlerts: jest.fn() }))
const { createAlerts } = require('../../../../app/messaging/create-alerts')

const { getSender, sendMessage } = require('../../../../app/messaging/service-bus')
const sendPublishMessage = require('../../../../app/messaging/publish/send-publish-message')

const mockSender = { sendMessages: jest.fn().mockResolvedValue(undefined) }

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
  beforeEach(() => {
    jest.clearAllMocks()
    getSender.mockReturnValue(mockSender)
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

    test('should send message via service bus sender', async () => {
      await sendPublishMessage(document, filename, type)
      const sentMessage = sendMessage.mock.calls[0][1]

      expect(getSender).toHaveBeenCalledWith({ address: 'test-publish-topic' })
      expect(sendMessage).toHaveBeenCalledWith(mockSender, createMessage())
      expect(sendMessage).toHaveBeenCalledTimes(1)
      expect(sentMessage.body.filename).toBe(filename)
      expect(sentMessage.body.businessName).toBe(document.businessName)
      expect(sentMessage.body.frn).toBe(document.frn)
      expect(sentMessage.body.sbi).toBe(document.sbi)
      expect(sentMessage.body.address).toBe(document.address)
      expect(sentMessage.body.email).toBe(document.email)
      expect(sentMessage.body.scheme).toBe(document.scheme)
      expect(sentMessage.type).toBe(messagePublish.type)
      expect(sentMessage.source).toBe(messagePublish.source)
    })

    test('reuses sender across multiple calls', async () => {
      await sendPublishMessage(document, filename, type)
      await sendPublishMessage(document, filename, type)

      expect(getSender).toHaveBeenCalledTimes(2)
      expect(sendMessage.mock.calls[0][0]).toBe(mockSender)
      expect(sendMessage.mock.calls[1][0]).toBe(mockSender)
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
