const sendRetentionMessages = require('../../app/messaging/publish/send-retention-messages')
const { MessageSender } = require('ffc-messaging')
const config = require('../../app/config')
const MESSAGE_SOURCE = require('../../app/constants/message-source')

jest.mock('ffc-messaging', () => ({
  MessageSender: jest.fn()
}))

jest.mock('../../app/config', () => ({
  statementRetentionTopic: 'test-topic'
}))

jest.mock('../../app/constants/message-source', () => 'test-source')

describe('sendRetentionMessages', () => {
  let senderMockInstance
  let consoleErrorSpy

  beforeEach(() => {
    senderMockInstance = {
      sendMessage: jest.fn().mockResolvedValue(),
      closeConnection: jest.fn().mockResolvedValue()
    }
    MessageSender.mockClear()
    MessageSender.mockImplementation(() => senderMockInstance)
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { })
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  test('sends a message for each generation and closes connection', async () => {
    const generations = [
      { documentReference: 'docRef1', filename: 'file1.pdf' },
      { documentReference: 'docRef2', filename: 'file2.pdf' }
    ]

    await sendRetentionMessages(generations)

    expect(MessageSender).toHaveBeenCalledTimes(generations.length)
    expect(MessageSender).toHaveBeenCalledWith(config.statementRetentionTopic)

    expect(senderMockInstance.sendMessage).toHaveBeenCalledTimes(generations.length)
    generations.forEach((generation, i) => {
      expect(senderMockInstance.sendMessage).toHaveBeenNthCalledWith(i + 1, {
        body: {
          documentReference: generation.documentReference,
          filename: generation.filename
        },
        type: 'uk.gov.doc.statement.retention',
        source: MESSAGE_SOURCE
      })
    })

    expect(senderMockInstance.closeConnection).toHaveBeenCalledTimes(1)
  })

  test('logs error if sendMessage throws and still closes connection', async () => {
    const generations = [
      { documentReference: 'docRef1', filename: 'file1.pdf' }
    ]
    const sendError = new Error('Send failed')
    senderMockInstance.sendMessage.mockRejectedValue(sendError)

    await sendRetentionMessages(generations)

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error sending statement retention message:',
      sendError
    )
    expect(senderMockInstance.closeConnection).toHaveBeenCalledTimes(1)
  })

  test('logs error if closeConnection throws', async () => {
    const generations = [
      { documentReference: 'docRef1', filename: 'file1.pdf' }
    ]
    senderMockInstance.closeConnection.mockRejectedValue(new Error('Close failed'))

    await sendRetentionMessages(generations)

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error closing message sender connection:',
      expect.any(Error)
    )
  })

  test('does not attempt to close connection if sender was never created', async () => {
    // Modify MessageSender to throw before instance creation
    MessageSender.mockImplementation(() => {
      throw new Error('Ctor failed')
    })

    const generations = [
      { documentReference: 'docRef1', filename: 'file1.pdf' }
    ]

    await sendRetentionMessages(generations)

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error sending statement retention message:',
      expect.any(Error)
    )
  })
})
