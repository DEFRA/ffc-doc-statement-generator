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

jest.mock('../../../../app/publishing/crm/create-crm-message')
const createCrmMessage = require('../../../../app/publishing/crm/create-crm-message')

const sendCrmMessage = require('../../../../app/publishing/crm/send-crm-message')
const mockStatement = require('../../../mocks/mock-delinked-statement')
const { DELINKEDSTATEMENT: FILENAME } = require('../../../mocks/components/filename')
const { DELINKED } = require('../../../../app/constants/document-types')

describe('send crm message', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call createCrmMessage when statement and filename are given', async () => {
    await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(createCrmMessage).toHaveBeenCalled()
  })

  test('should call createCrmMessage once when statement and filename are given', async () => {
    await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(createCrmMessage).toHaveBeenCalledTimes(1)
  })

  test('should call createCrmMessage with statement and filename when statement and filename are given', async () => {
    await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(createCrmMessage).toHaveBeenCalledWith(mockStatement, FILENAME, DELINKED)
  })
})
