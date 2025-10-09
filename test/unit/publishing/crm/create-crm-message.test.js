jest.mock('../../../../app/publishing/crm/crm-schema')
const schema = require('../../../../app/publishing/crm/crm-schema')

const { statementReceiverApiVersion, statementReceiverEndpoint } = require('../../../../app/config')
const createCrmMessage = require('../../../../app/publishing/crm/create-crm-message')
const mockStatement = require('../../../mocks/mock-delinked-statement')
const { DELINKED } = require('../../../../app/constants/document-types')
const { DELINKEDSTATEMENT: FILENAME } = require('../../../mocks/components/filename')

let crmValid
let crmMessage

describe('send crm message for statement', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockStatement.scheme.shortName = 'DP'

    crmValid = {
      sbi: mockStatement.sbi,
      frn: mockStatement.frn,
      apiLink: `${statementReceiverEndpoint}/${statementReceiverApiVersion}/statements/statement/${FILENAME}`,
      scheme: 'Delinked',
      documentType: DELINKED.name
    }

    crmMessage = {
      body: {
        ...crmValid
      },
      type: 'uk.gov.doc.delinked-statement.crm',
      source: 'ffc-doc-statement-generator'
    }

    schema.validate.mockReturnValue({ value: crmValid })
  })

  test('should map DP scheme to Delinked in message', async () => {
    const result = createCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(result.body.scheme).toBe('Delinked')
  })

  test('should call schema.validate when statement and filename are given', async () => {
    createCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(schema.validate).toHaveBeenCalled()
  })

  test('should call schema.validate once when statement and filename are given', async () => {
    createCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(schema.validate).toHaveBeenCalledTimes(1)
  })

  test('should return valid message when statement and filename are given', async () => {
    const result = createCrmMessage(mockStatement, FILENAME, DELINKED)
    expect(result).toStrictEqual(crmMessage)
  })

  test('should throw Error when schema validate throws Error', async () => {
    schema.validate.mockReturnValue({ error: 'Not a valid object' })
    expect(() => createCrmMessage(mockStatement, FILENAME, DELINKED)).toThrow(Error)
  })
})
