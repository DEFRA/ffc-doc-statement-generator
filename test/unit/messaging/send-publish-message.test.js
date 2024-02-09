const { mockMessageSender } = require('../../mocks/modules/ffc-messaging')

jest.mock('../../../app/messaging/publish/create-message')
const createMessage = require('../../../app/messaging/publish/create-message')

const { STATEMENT: STATEMENT_TYPE, SCHEDULE: SCHEDULE_TYPE } = require('../../../app/constants/document-types')

const { STATEMENT: STATEMENT_FILENAME, SCHEDULE: SCHEDULE_FILENAME } = require('../../mocks/components/filename')
const { STATEMENT_MESSAGE: STATEMENT_MESSAGE_INCOMING, SCHEDULE_MESSAGE: SCHEDULE_MESSAGE_INCOMING } = require('../../mocks/messages/mock-process-message')
const { STATEMENT_MESSAGE: STATEMENT_MESSAGE_OUTGOING, SCHEDULE_MESSAGE: SCHEDULE_MESSAGE_OUTGOING } = require('../../mocks/messages/publish')

const sendPublishMessage = require('../../../app/messaging/publish/send-publish-message')

let document
let filename
let type

describe('send publish message', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when document is a statement', () => {
    beforeEach(() => {
      document = STATEMENT_MESSAGE_INCOMING.body
      filename = STATEMENT_FILENAME
      type = STATEMENT_TYPE.id

      createMessage.mockReturnValue(STATEMENT_MESSAGE_OUTGOING)
    })

    test('should call createMessage', async () => {
      await sendPublishMessage(document, filename, type)
      expect(createMessage).toHaveBeenCalled()
    })

    test('should call createMessage once', async () => {
      await sendPublishMessage(document, filename, type)
      expect(createMessage).toHaveBeenCalledTimes(1)
    })

    test('should call createMessage with document, filename and type', async () => {
      await sendPublishMessage(document, filename, type)
      expect(createMessage).toHaveBeenCalledWith(document, filename, type)
    })

    test('should call mockMessageSender.sendMessage', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage).toHaveBeenCalled()
    })

    test('should call mockMessageSender.sendMessage once', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
    })

    test('should call mockMessageSender.sendMessage with body.filename', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].body.filename).toBe(filename)
    })

    test('should call mockMessageSender.sendMessage with body.businessName', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].body.businessName).toBe(document.businessName)
    })

    test('should call mockMessageSender.sendMessage with body.frn', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].body.frn).toBe(document.frn)
    })

    test('should call mockMessageSender.sendMessage with body.sbi', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].body.sbi).toBe(document.sbi)
    })

    test('should call mockMessageSender.sendMessage with body.address', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].body.address).toBe(document.address)
    })

    test('should call mockMessageSender.sendMessage with body.email', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].body.email).toBe(document.email)
    })

    test('should call mockMessageSender.sendMessage with body.scheme', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].body.scheme).toBe(document.scheme)
    })

    test('should call mockMessageSender.sendMessage with body.type', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].type).toBe(STATEMENT_MESSAGE_OUTGOING.type)
    })

    test('should call mockMessageSender.sendMessage with body.source', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].source).toBe(STATEMENT_MESSAGE_OUTGOING.source)
    })

    test('should call mockMessageSender.sendMessage with createMessage', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage).toHaveBeenCalledWith(createMessage())
    })

    test('should call mockMessageSender.closeConnection', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().closeConnection).toHaveBeenCalled()
    })

    test('should call mockMessageSender.closeConnection once', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().closeConnection).toHaveBeenCalledTimes(1)
    })
  })

  describe('when document is a schedule', () => {
    beforeEach(() => {
      document = SCHEDULE_MESSAGE_INCOMING.body
      filename = SCHEDULE_FILENAME
      type = SCHEDULE_TYPE.id

      createMessage.mockReturnValue(SCHEDULE_MESSAGE_OUTGOING)
    })

    test('should call createMessage', async () => {
      await sendPublishMessage(document, filename, type)
      expect(createMessage).toHaveBeenCalled()
    })

    test('should call createMessage once', async () => {
      await sendPublishMessage(document, filename, type)
      expect(createMessage).toHaveBeenCalledTimes(1)
    })

    test('should call createMessage with document, filename and type', async () => {
      await sendPublishMessage(document, filename, type)
      expect(createMessage).toHaveBeenCalledWith(document, filename, type)
    })

    test('should call mockMessageSender.sendMessage', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage).toHaveBeenCalled()
    })

    test('should call mockMessageSender.sendMessage once', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
    })

    test('should call mockMessageSender.sendMessage with body.filename', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].body.filename).toBe(filename)
    })

    test('should call mockMessageSender.sendMessage with body.businessName', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].body.businessName).toBe(document.businessName)
    })

    test('should call mockMessageSender.sendMessage with body.frn', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].body.frn).toBe(document.frn)
    })

    test('should call mockMessageSender.sendMessage with body.sbi', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].body.sbi).toBe(document.sbi)
    })

    test('should call mockMessageSender.sendMessage with body.address', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].body.address).toBe(document.address)
    })

    test('should call mockMessageSender.sendMessage with body.email', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].body.email).toBe(document.email)
    })

    test('should call mockMessageSender.sendMessage with body.scheme', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].body.scheme).toBe(document.scheme)
    })

    test('should call mockMessageSender.sendMessage with body.type', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].type).toBe(SCHEDULE_MESSAGE_OUTGOING.type)
    })

    test('should call mockMessageSender.sendMessage with body.source', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage.mock.calls[0][0].source).toBe(SCHEDULE_MESSAGE_OUTGOING.source)
    })

    test('should call mockMessageSender.sendMessage with createMessage', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().sendMessage).toHaveBeenCalledWith(createMessage())
    })

    test('should call mockMessageSender.closeConnection', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().closeConnection).toHaveBeenCalled()
    })

    test('should call mockMessageSender.closeConnection once', async () => {
      await sendPublishMessage(document, filename, type)
      expect(mockMessageSender().closeConnection).toHaveBeenCalledTimes(1)
    })
  })
})
