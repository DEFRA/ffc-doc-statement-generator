jest.mock('ffc-messaging')
jest.mock('../../../app/data')
const mockGenerator = jest.fn()
jest.mock('../../../app/generator', () => ({
  generateDocument: mockGenerator
}))
const mockValidation = jest.fn()
jest.mock('../../../app/messaging/validate-request', () => ({
  validateRequest: mockValidation
}))
const mockStatement = require('../../mocks/mock-delinked-statement')
const processMessage = require('../../../app/messaging/process-message')
const { VALIDATION } = require('../../../app/constants/errors')
const { DELINKED: STATEMENT } = require('../../../app/constants/document-types')

let receiver

const mockValidationImplementation = () => {
  const err = new Error('Validation error')
  err.category = VALIDATION
  throw err
}

describe('processStatementMessage', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    receiver = {
      completeMessage: jest.fn(),
      deadLetterMessage: jest.fn(),
      abandonMessage: jest.fn()
    }
  })

  const successMessage = {
    body: mockStatement,
    applicationProperties: { type: STATEMENT.type }
  }

  test('completes message on success', async () => {
    await processMessage(successMessage, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledWith(successMessage)
    expect(receiver.completeMessage).toHaveBeenCalledTimes(1)
  })

  test('calls validate statement and generator with statement', async () => {
    await processMessage(successMessage, receiver)
    expect(mockValidation).toHaveBeenCalledWith(successMessage.body, STATEMENT)
    expect(mockValidation).toHaveBeenCalledTimes(1)
    expect(mockGenerator).toHaveBeenCalledWith(successMessage.body, STATEMENT)
    expect(mockGenerator).toHaveBeenCalledTimes(1)
  })

  test.each([
    ['non-validation generation error', () => mockGenerator.mockImplementation(() => { throw new Error('A generation error') })],
    ['another generation error', () => mockGenerator.mockImplementation(() => { throw new Error('Unable to generate') })]
  ])('does not complete or dead letter message on %s', async (_, setup) => {
    setup()
    await processMessage(successMessage, receiver)
    expect(receiver.completeMessage).not.toHaveBeenCalled()
    expect(receiver.deadLetterMessage).not.toHaveBeenCalled()
  })

  test('dead letters message if validation error', async () => {
    mockValidation.mockImplementation(mockValidationImplementation)
    await processMessage(successMessage, receiver)
    expect(receiver.deadLetterMessage).toHaveBeenCalledWith(successMessage)
    expect(receiver.deadLetterMessage).toHaveBeenCalledTimes(1)
    expect(receiver.completeMessage).not.toHaveBeenCalled()
  })
})
