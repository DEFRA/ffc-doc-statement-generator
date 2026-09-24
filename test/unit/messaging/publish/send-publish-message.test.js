jest.mock('../../../../app/config', () => ({ publishTopic: { address: 'test-publish-topic' } }))
jest.mock('../../../../app/messaging/service-bus', () => ({
  getSender: jest.fn(),
  sendMessage: jest.fn(),
  closeSender: jest.fn()
}))
jest.mock('../../../../app/messaging/publish/create-message', () => jest.fn())
jest.mock('../../../../app/messaging/create-alerts', () => ({ createAlerts: jest.fn() }))

const { getSender, sendMessage, closeSender } = require('../../../../app/messaging/service-bus')
const createMessage = require('../../../../app/messaging/publish/create-message')
const { createAlerts } = require('../../../../app/messaging/create-alerts')
const sendPublishMessage = require('../../../../app/messaging/publish/send-publish-message')

describe('sendPublishMessage', () => {
  let mockSender
  let consoleErrorSpy

  beforeEach(() => {
    mockSender = { sendMessages: jest.fn().mockResolvedValue(undefined) }
    jest.clearAllMocks()
    getSender.mockReturnValue(mockSender)
    createMessage.mockReset()
    createAlerts.mockReset()
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  test('creates message and sends it via the sender', async () => {
    const builtMessage = { body: { test: true } }
    createMessage.mockResolvedValue(builtMessage)

    await sendPublishMessage({ sbi: '123' }, 'file.pdf', 1)

    expect(createMessage).toHaveBeenCalledWith({ sbi: '123' }, 'file.pdf', 1)
    expect(getSender).toHaveBeenCalledWith({ address: 'test-publish-topic' })
    expect(sendMessage).toHaveBeenCalledWith(mockSender, builtMessage)
  })

  test('reuses sender across multiple calls', async () => {
    createMessage.mockResolvedValue({ body: {} })

    await sendPublishMessage({ sbi: '123' }, 'file1.pdf', 1)
    await sendPublishMessage({ sbi: '456' }, 'file2.pdf', 1)

    expect(getSender).toHaveBeenCalledTimes(2)
    expect(getSender).toHaveBeenCalledWith({ address: 'test-publish-topic' })
    expect(sendMessage).toHaveBeenCalledTimes(2)
    expect(sendMessage.mock.calls[0][0]).toBe(mockSender)
    expect(sendMessage.mock.calls[1][0]).toBe(mockSender)
  })

  test('logs error, creates alert, and rethrows when sendMessage fails', async () => {
    const sendError = new Error('Send failed')
    createMessage.mockResolvedValue({ body: {} })
    sendMessage.mockRejectedValue(sendError)
    createAlerts.mockResolvedValue(undefined)

    await expect(sendPublishMessage({ sbi: '123' }, 'file.pdf', 1)).rejects.toThrow('Send failed')

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error sending publish message:', sendError)
    expect(createAlerts).toHaveBeenCalledWith([{ file: 'file.pdf', message: 'Send failed' }])
  })

  test('closeSender closes the sender for the publish topic', async () => {
    await sendPublishMessage.closeSender()

    expect(closeSender).toHaveBeenCalledTimes(1)
    expect(closeSender).toHaveBeenCalledWith({ address: 'test-publish-topic' })
  })
})
