jest.mock('../../../../app/config', () => ({ crmTopic: { address: 'test-crm-topic' } }))
jest.mock('../../../../app/messaging/service-bus', () => ({
  getSender: jest.fn(),
  sendMessage: jest.fn(),
  closeSender: jest.fn()
}))
jest.mock('../../../../app/publishing/crm/create-crm-message', () => jest.fn())

const { getSender, sendMessage, closeSender: closeServiceBusSender } = require('../../../../app/messaging/service-bus')
const createCrmMessage = require('../../../../app/publishing/crm/create-crm-message')
const sendCrmMessage = require('../../../../app/publishing/crm/send-crm-message')
const mockStatement = require('../../../mocks/mock-delinked-statement')
const { DELINKEDSTATEMENT: FILENAME } = require('../../../mocks/components/filename')
const { DELINKED } = require('../../../../app/constants/document-types')

describe('send crm message', () => {
  let mockSender

  beforeEach(() => {
    mockSender = { sendMessages: jest.fn().mockResolvedValue(undefined) }
    jest.clearAllMocks()
    getSender.mockReturnValue(mockSender)
    createCrmMessage.mockReset()
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

  test('reuses sender across multiple calls', async () => {
    createCrmMessage.mockReturnValue({ body: { apiLink: 'http://example.com' } })
    await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(getSender).toHaveBeenCalledTimes(2)
    expect(sendMessage).toHaveBeenCalledTimes(2)
    expect(sendMessage.mock.calls[0][0]).toBe(mockSender)
    expect(sendMessage.mock.calls[1][0]).toBe(mockSender)
  })

  test('returns apiLink from message body', async () => {
    createCrmMessage.mockReturnValue({ body: { apiLink: 'http://example.com/link' } })
    const result = await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(result).toBe('http://example.com/link')
  })

  test('closeSender closes the sender for the crm topic', async () => {
    await sendCrmMessage.closeSender()
    expect(closeServiceBusSender).toHaveBeenCalledTimes(1)
    expect(closeServiceBusSender).toHaveBeenCalledWith({ address: 'test-crm-topic' })
  })
})
