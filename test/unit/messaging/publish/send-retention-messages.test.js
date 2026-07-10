describe('sendRetentionMessages', () => {
  let sendRetentionMessages
  let closeSender
  let senderMockInstance
  let MockMessageSender
  let consoleErrorSpy

  beforeEach(() => {
    senderMockInstance = {
      sendMessage: jest.fn().mockResolvedValue(undefined),
      closeConnection: jest.fn().mockResolvedValue(undefined)
    }
    MockMessageSender = jest.fn().mockImplementation(() => senderMockInstance)

    jest.resetModules()
    jest.doMock('ffc-messaging', () => ({ MessageSender: MockMessageSender }))
    jest.doMock('../../../../app/config', () => ({ statementRetentionTopic: 'test-topic' }))
    jest.doMock('../../../../app/constants/message-source', () => 'test-source')

    const mod = require('../../../../app/messaging/publish/send-retention-messages')
    sendRetentionMessages = mod
    closeSender = mod.closeSender

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  test('creates sender once and sends a message for each generation', async () => {
    const generations = [
      { documentReference: 'docRef1', filename: 'file1.pdf' },
      { documentReference: 'docRef2', filename: 'file2.pdf' }
    ]

    await sendRetentionMessages(generations)

    expect(MockMessageSender).toHaveBeenCalledTimes(1)
    expect(MockMessageSender).toHaveBeenCalledWith('test-topic')

    expect(senderMockInstance.sendMessage).toHaveBeenCalledTimes(generations.length)
    generations.forEach((generation, i) => {
      expect(senderMockInstance.sendMessage).toHaveBeenNthCalledWith(i + 1, {
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

    expect(MockMessageSender).toHaveBeenCalledTimes(1)
    expect(senderMockInstance.sendMessage).toHaveBeenCalledTimes(2)
  })

  test('logs error if sendMessage throws', async () => {
    const generations = [{ documentReference: 'docRef1', filename: 'file1.pdf' }]
    const sendError = new Error('Send failed')
    senderMockInstance.sendMessage.mockRejectedValue(sendError)

    await sendRetentionMessages(generations)

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error sending statement retention message:',
      sendError
    )
  })

  test('closeSender closes the connection and resets the singleton', async () => {
    const generations = [{ documentReference: 'docRef1', filename: 'file1.pdf' }]
    await sendRetentionMessages(generations)

    await closeSender()

    expect(senderMockInstance.closeConnection).toHaveBeenCalledTimes(1)

    // After closing, a new call should create a fresh sender
    await sendRetentionMessages(generations)
    expect(MockMessageSender).toHaveBeenCalledTimes(2)
  })

  test('closeSender does nothing if sender was never created', async () => {
    await closeSender()
    expect(senderMockInstance.closeConnection).not.toHaveBeenCalled()
  })
})
