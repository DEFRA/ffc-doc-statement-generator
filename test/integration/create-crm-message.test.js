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
jest.mock('../../app/config')
const createCrmMessage = require('../../app/messaging/crm/create-crm-message')
const mockStatement = require('../mocks/statement-data')
const BLOB_URL = 'https://myBlobStorageAccount.blob.core.windows.net/statements/outbound/FFC_PaymentStatement_SFI_2022_1234567890_2022080515301012.pdf'

describe('send crm message', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should throw Error when statement has no sbi ', async () => {
    mockStatement.sbi = null
    const wrapper = async () => {
      createCrmMessage(mockStatement, BLOB_URL)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw Error when statement has no frn ', async () => {
    mockStatement.frn = null
    const wrapper = async () => {
      createCrmMessage(mockStatement, BLOB_URL)
    }

    expect(wrapper).rejects.toThrow(Error)
  })

  test('should throw Error when filename is null ', async () => {
    const wrapper = async () => {
      createCrmMessage(mockStatement, null)
    }

    expect(wrapper).rejects.toThrow(Error)
  })
})
