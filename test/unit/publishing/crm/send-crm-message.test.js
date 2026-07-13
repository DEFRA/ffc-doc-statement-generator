jest.mock('ffc-messaging', () => ({ MessageSender: jest.fn() }))
jest.mock('../../../../app/config', () => ({ crmTopic: 'test-crm-topic' }))
jest.mock('../../../../app/publishing/crm/create-crm-message', () => jest.fn())

const { MessageSender } = require('ffc-messaging')
const createCrmMessage = require('../../../../app/publishing/crm/create-crm-message')
const sendCrmMessage = require('../../../../app/publishing/crm/send-crm-message')
const mockStatement = require('../../../mocks/mock-delinked-statement')
const { DELINKEDSTATEMENT: FILENAME } = require('../../../mocks/components/filename')
const { DELINKED } = require('../../../../app/constants/document-types')

describe('send crm message', () => {
  let senderMockInstance

  beforeEach(() => {
    senderMockInstance = {
      sendMessage: jest.fn().mockResolvedValue(undefined),
      closeConnection: jest.fn().mockResolvedValue(undefined)
    }
    MessageSender.mockClear()
    MessageSender.mockImplementation(() => senderMockInstance)
    createCrmMessage.mockReset()
  })

  afterEach(async () => {
    await sendCrmMessage.closeSender()
  })

  test('should call createCrmMessage when statement and filename are given', async () => {
    createCrmMessage.mockReturnValue({ body: { apiLink: 'http://example.com' } })
    await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(createCrmMessage).toHaveBeenCalled()
  })

  test('should call createCrmMessage once when statement and filename are given', async () => {
    createCrmMessage.mockReturnValue({ body: { apiLink: 'http://example.com' } })
    await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(createCrmMessage).toHaveBeenCalledTimes(1)
  })

  test('should call createCrmMessage with statement and filename when statement and filename are given', async () => {
    createCrmMessage.mockReturnValue({ body: { apiLink: 'http://example.com' } })
    await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(createCrmMessage).toHaveBeenCalledWith(mockStatement, FILENAME, DELINKED)
  })

  test('creates sender only once across multiple calls', async () => {
    createCrmMessage.mockReturnValue({ body: { apiLink: 'http://example.com' } })
    await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(MessageSender).toHaveBeenCalledTimes(1)
    expect(senderMockInstance.sendMessage).toHaveBeenCalledTimes(2)
  })

  test('returns apiLink from message body', async () => {
    createCrmMessage.mockReturnValue({ body: { apiLink: 'http://example.com/link' } })
    const result = await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(result).toBe('http://example.com/link')
  })

  test('closeSender closes the connection and resets the singleton', async () => {
    createCrmMessage.mockReturnValue({ body: { apiLink: 'http://example.com' } })
    await sendCrmMessage(mockStatement, FILENAME, DELINKED)

    await sendCrmMessage.closeSender()

    expect(senderMockInstance.closeConnection).toHaveBeenCalledTimes(1)

    // Sending again after close should create a fresh sender
    await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(MessageSender).toHaveBeenCalledTimes(2)
  })

  test('closeSender does nothing if sender was never created', async () => {
    await sendCrmMessage.closeSender()
    expect(senderMockInstance.closeConnection).not.toHaveBeenCalled()
  })
})
