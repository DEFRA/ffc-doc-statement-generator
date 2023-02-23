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

jest.mock('../../../app/messaging/crm/create-crm-message')
const createCrmMessage = require('../../../app/messaging/crm/create-crm-message')

const sendCrmMessage = require('../../../app/messaging/crm/send-crm-message')
const mockStatement = require('../../mocks/statement-data')
const FILENAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'

describe('send crm message', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call createCrmMessage when statement and filename are given', async () => {
    await sendCrmMessage(mockStatement, FILENAME)
    expect(createCrmMessage).toHaveBeenCalled()
  })

  test('should call createCrmMessage once when statement and filename are given', async () => {
    await sendCrmMessage(mockStatement, FILENAME)
    expect(createCrmMessage).toHaveBeenCalledTimes(1)
  })

  test('should call createCrmMessage with statement and filename when statement and filename are given', async () => {
    await sendCrmMessage(mockStatement, FILENAME)
    expect(createCrmMessage).toHaveBeenCalledWith(mockStatement, FILENAME)
  })
})
