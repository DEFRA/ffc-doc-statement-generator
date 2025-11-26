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

const sendCrmMessage = require('../../app/publishing/crm/send-crm-message')
const mockStatement = require('../mocks/mock-delinked-statement')
const { statementReceiverApiVersion, statementReceiverEndpoint } = require('../../app/config')
const { DELINKED } = require('../../app/constants/document-types')
const { DELINKEDSTATEMENT: FILENAME } = require('../mocks/components/filename')

describe('sendCrmMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test.each([
    ['apiLink', (msg) => msg.body.apiLink, `${statementReceiverEndpoint}/${statementReceiverApiVersion}/statements/statement/${FILENAME}`],
    ['FRN', (msg) => msg.body.frn, mockStatement.frn],
    ['SBI', (msg) => msg.body.sbi, mockStatement.sbi],
    ['type', (msg) => msg.type, 'uk.gov.doc.delinked-statement.crm'],
    ['source', (msg) => msg.source, 'ffc-doc-statement-generator']
  ])('sends crm message with %s', async (_, getValue, expected) => {
    await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    const message = mockSendMessage.mock.calls[0][0]
    expect(getValue(message)).toBe(expected)
  })

  test('sends one crm message', async () => {
    await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(mockSendMessage).toHaveBeenCalledTimes(1)
  })

  test('closes connection', async () => {
    await sendCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(mockCloseConnection).toHaveBeenCalledTimes(1)
  })
})
