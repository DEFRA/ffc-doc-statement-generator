jest.mock('../../../../app/messaging/crm/crm-schema')
const schema = require('../../../../app/messaging/crm/crm-schema')

const { statementReceiverApiVersion, statementReceiverEndpoint } = require('../../../../app/config')
const createCrmMessage = require('../../../../app/messaging/crm/create-crm-message')
const mockStatement = require('../../../mocks/mock-statement')
const { STATEMENT, SCHEDULE } = require('../../../../app/constants/document-types')
const FILENAME = 'FFC_PaymentStatement_SFI_2022_1234567890_2022080515301212.pdf'

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
      documentType: STATEMENT.name
    }

    crmMessage = {
      body: {
        ...crmValid
      },
      type: 'uk.gov.doc.statement.crm',
      source: 'ffc-doc-statement-generator'
    }

    schema.validate.mockReturnValue({ value: crmValid })
  })

  test('should map DP scheme to Delinked in message', async () => {
    const result = createCrmMessage(mockStatement, FILENAME, STATEMENT)
    expect(result.body.scheme).toBe('Delinked')
  })

  test('should call schema.validate when statement and filename are given', async () => {
    createCrmMessage(mockStatement, FILENAME, STATEMENT)
    expect(schema.validate).toHaveBeenCalled()
  })

  test('should call schema.validate once when statement and filename are given', async () => {
    createCrmMessage(mockStatement, FILENAME, STATEMENT)
    expect(schema.validate).toHaveBeenCalledTimes(1)
  })

  test('should return valid message when statement and filename are given', async () => {
    const result = createCrmMessage(mockStatement, FILENAME, STATEMENT)
    expect(result).toStrictEqual(crmMessage)
  })

  test('should throw Error when schema validate throws Error', async () => {
    schema.validate.mockReturnValue({ error: 'Not a valid object' })
    expect(() => createCrmMessage(mockStatement, FILENAME, STATEMENT)).toThrow(Error)
  })
})

describe('send crm message for payment schedule', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockStatement.scheme.shortName = 'DP'

    crmValid = {
      sbi: mockStatement.sbi,
      frn: mockStatement.frn,
      apiLink: `${statementReceiverEndpoint}/${statementReceiverApiVersion}/statements/statement/${FILENAME}`,
      scheme: 'Delinked',
      documentType: SCHEDULE.name
    }

    crmMessage = {
      body: {
        ...crmValid
      },
      type: 'uk.gov.doc.schedule.crm',
      source: 'ffc-doc-statement-generator'
    }

    schema.validate.mockReturnValue({ value: crmValid })
  })

  test('should map DP scheme to Delinked in schedule message', async () => {
    const result = createCrmMessage(mockStatement, FILENAME, SCHEDULE)
    expect(result.body.scheme).toBe('Delinked')
  })

  test('should call schema.validate when statement and filename are given', async () => {
    createCrmMessage(mockStatement, FILENAME, SCHEDULE)
    expect(schema.validate).toHaveBeenCalled()
  })

  test('should call schema.validate once when statement and filename are given', async () => {
    createCrmMessage(mockStatement, FILENAME, SCHEDULE)
    expect(schema.validate).toHaveBeenCalledTimes(1)
  })

  test('should return valid message when statement and filename are given', async () => {
    const result = createCrmMessage(mockStatement, FILENAME, SCHEDULE)
    expect(result).toStrictEqual(crmMessage)
  })

  test('should throw Error when schema validate throws Error', async () => {
    schema.validate.mockReturnValue({ error: 'Not a valid object' })

    const wrapper = async () => {
      createCrmMessage(mockStatement, FILENAME, SCHEDULE)
    }

    expect(wrapper).rejects.toThrow(Error)
  })
})
