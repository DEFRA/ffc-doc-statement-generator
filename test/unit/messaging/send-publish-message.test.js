const mockSendMessage = jest.fn()
const mockCloseConnection = jest.fn()
jest.mock('ffc-messaging', () => {
  return {
    MessageSender: jest.fn().mockImplementation(() => {
      return {
        sendMessage: mockSendMessage,
        closeConnection: mockCloseConnection
      }
    })
  }
})
const sendPublishMessage = require('../../../app/messaging/send-publish-message')
const mockStatement = require('../../mocks/statement-data')
const FILE_NAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'

describe('send publish message', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('sends one message', async () => {
    await sendPublishMessage(mockStatement, FILE_NAME)
    expect(mockSendMessage).toHaveBeenCalledTimes(1)
  })

  test('closes connection', async () => {
    await sendPublishMessage(mockStatement, FILE_NAME)
    expect(mockCloseConnection).toHaveBeenCalledTimes(1)
  })

  test('sends message with filename', async () => {
    await sendPublishMessage(mockStatement, FILE_NAME)
    expect(mockSendMessage.mock.calls[0][0].body.filename).toBe(FILE_NAME)
  })

  test('sends message with business name', async () => {
    await sendPublishMessage(mockStatement, FILE_NAME)
    expect(mockSendMessage.mock.calls[0][0].body.businessName).toBe(mockStatement.businessName)
  })

  test('sends message with FRN', async () => {
    await sendPublishMessage(mockStatement, FILE_NAME)
    expect(mockSendMessage.mock.calls[0][0].body.frn).toBe(mockStatement.frn)
  })

  test('sends message with SBI', async () => {
    await sendPublishMessage(mockStatement, FILE_NAME)
    expect(mockSendMessage.mock.calls[0][0].body.sbi).toBe(mockStatement.sbi)
  })

  test('sends message with address', async () => {
    await sendPublishMessage(mockStatement, FILE_NAME)
    expect(mockSendMessage.mock.calls[0][0].body.address).toBe(mockStatement.address)
  })

  test('sends message with email', async () => {
    await sendPublishMessage(mockStatement, FILE_NAME)
    expect(mockSendMessage.mock.calls[0][0].body.email).toBe(mockStatement.email)
  })

  test('sends message with type', async () => {
    await sendPublishMessage(mockStatement, FILE_NAME)
    expect(mockSendMessage.mock.calls[0][0].type).toBe('uk.gov.pay.statement.publish')
  })

  test('sends message with source', async () => {
    await sendPublishMessage(mockStatement, FILE_NAME)
    expect(mockSendMessage.mock.calls[0][0].source).toBe('ffc-pay-statement-generator')
  })

  test('sends message with scheme', async () => {
    await sendPublishMessage(mockStatement, FILE_NAME)
    expect(mockSendMessage.mock.calls[0][0].body.scheme).toBe(mockStatement.scheme)
  })
})
