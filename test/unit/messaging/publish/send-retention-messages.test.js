jest.mock('../../../../app/config', () => ({ statementRetentionTopic: { address: 'test-topic' } }))
jest.mock('../../../../app/messaging/service-bus', () => ({
  getSender: jest.fn(),
  sendMessage: jest.fn(),
  closeSender: jest.fn()
}))
jest.mock('../../../../app/constants/message-source', () => 'test-source')

const { getSender, sendMessage, closeSender: closeServiceBusSender } = require('../../../../app/messaging/service-bus')
const sendRetentionMessagesModule = require('../../../../app/messaging/publish/send-retention-messages')
const sendRetentionMessages = sendRetentionMessagesModule
const closeSender = sendRetentionMessagesModule.closeSender

describe('sendRetentionMessages', () => {
  let mockSender
  let consoleErrorSpy

  beforeEach(() => {
    mockSender = { sendMessages: jest.fn().mockResolvedValue(undefined) }
    jest.clearAllMocks()
    getSender.mockReturnValue(mockSender)
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  test('sends a message for each generation using the same sender', async () => {
    const generations = [
      { documentReference: 'docRef1', filename: 'file1.pdf' },
      { documentReference: 'docRef2', filename: 'file2.pdf' }
    ]

    await sendRetentionMessages(generations)

    expect(getSender).toHaveBeenCalledTimes(generations.length)
    expect(getSender).toHaveBeenCalledWith({ address: 'test-topic' })

    expect(sendMessage).toHaveBeenCalledTimes(generations.length)
    generations.forEach((generation, i) => {
      expect(sendMessage).toHaveBeenNthCalledWith(i + 1, mockSender, {
        body: {
          documentReference: generation.documentReference,
          filename: generation.filename
        },
        type: 'uk.gov.doc.statement.retention',
        source: 'test-source'
      })
    })
  })

  test('reuses sender across multiple calls without recreating it', async () => {
    const generations = [{ documentReference: 'docRef1', filename: 'file1.pdf' }]

    await sendRetentionMessages(generations)
    await sendRetentionMessages(generations)

    expect(getSender).toHaveBeenCalledTimes(2)
    expect(sendMessage).toHaveBeenCalledTimes(2)
    expect(sendMessage.mock.calls[0][0]).toBe(mockSender)
    expect(sendMessage.mock.calls[1][0]).toBe(mockSender)
  })

  test('logs error if sendMessage throws', async () => {
    const generations = [{ documentReference: 'docRef1', filename: 'file1.pdf' }]
    const sendError = new Error('Send failed')
    sendMessage.mockRejectedValue(sendError)

    await sendRetentionMessages(generations)

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error sending statement retention message:',
      sendError
    )
  })

  test('closeSender closes the sender for the retention topic', async () => {
    await closeSender()

    expect(closeServiceBusSender).toHaveBeenCalledTimes(1)
    expect(closeServiceBusSender).toHaveBeenCalledWith({ address: 'test-topic' })
  })
})
