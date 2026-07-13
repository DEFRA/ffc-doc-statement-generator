jest.mock('ffc-messaging', () => ({ MessageSender: jest.fn() }))
jest.mock('../../../../app/config', () => ({ publishTopic: 'test-publish-topic' }))
jest.mock('../../../../app/messaging/publish/create-message', () => jest.fn())
jest.mock('../../../../app/messaging/create-alerts', () => ({ createAlerts: jest.fn() }))

const { MessageSender } = require('ffc-messaging')
const createMessage = require('../../../../app/messaging/publish/create-message')
const { createAlerts } = require('../../../../app/messaging/create-alerts')
const sendPublishMessage = require('../../../../app/messaging/publish/send-publish-message')

describe('sendPublishMessage', () => {
  let senderMockInstance
  let consoleErrorSpy

  beforeEach(() => {
    senderMockInstance = {
      sendMessage: jest.fn().mockResolvedValue(undefined),
      closeConnection: jest.fn().mockResolvedValue(undefined)
    }
    MessageSender.mockClear()
    MessageSender.mockImplementation(() => senderMockInstance)
    createMessage.mockReset()
    createAlerts.mockReset()
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(async () => {
    consoleErrorSpy.mockRestore()
    await sendPublishMessage.closeSender()
  })

  test('creates message and sends it via the sender', async () => {
    const builtMessage = { body: { test: true } }
    createMessage.mockResolvedValue(builtMessage)

    await sendPublishMessage({ sbi: '123' }, 'file.pdf', 1)

    expect(createMessage).toHaveBeenCalledWith({ sbi: '123' }, 'file.pdf', 1)
    expect(senderMockInstance.sendMessage).toHaveBeenCalledWith(builtMessage)
  })

  test('creates sender only once across multiple calls', async () => {
    createMessage.mockResolvedValue({ body: {} })

    await sendPublishMessage({ sbi: '123' }, 'file1.pdf', 1)
    await sendPublishMessage({ sbi: '456' }, 'file2.pdf', 1)

    expect(MessageSender).toHaveBeenCalledTimes(1)
    expect(MessageSender).toHaveBeenCalledWith('test-publish-topic')
    expect(senderMockInstance.sendMessage).toHaveBeenCalledTimes(2)
  })

  test('logs error, creates alert, and rethrows when sendMessage fails', async () => {
    const sendError = new Error('Send failed')
    createMessage.mockResolvedValue({ body: {} })
    senderMockInstance.sendMessage.mockRejectedValue(sendError)
    createAlerts.mockResolvedValue(undefined)

    await expect(sendPublishMessage({ sbi: '123' }, 'file.pdf', 1)).rejects.toThrow('Send failed')

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending publish message:', sendError)
    expect(createAlerts).toHaveBeenCalledWith([{ file: 'file.pdf', message: 'Send failed' }])
  })

  test('closeSender closes the connection and resets the singleton', async () => {
    createMessage.mockResolvedValue({ body: {} })
    await sendPublishMessage({ sbi: '123' }, 'file.pdf', 1)

    await sendPublishMessage.closeSender()

    expect(senderMockInstance.closeConnection).toHaveBeenCalledTimes(1)

    // After close a fresh sender should be created on next call
    await sendPublishMessage({ sbi: '456' }, 'file2.pdf', 1)
    expect(MessageSender).toHaveBeenCalledTimes(2)
  })

  test('closeSender does nothing if sender was never created', async () => {
    await sendPublishMessage.closeSender()
    expect(senderMockInstance.closeConnection).not.toHaveBeenCalled()
  })
})
