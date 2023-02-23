jest.mock('ffc-messaging')
jest.mock('../../../app/data')
const mockGenerator = jest.fn()
jest.mock('../../../app/generator', () => {
  return mockGenerator
})
const mockValidation = jest.fn()
jest.mock('../../../app/messaging/validate-statement', () => {
  return mockValidation
})
const processStatementMessage = require('../../../app/messaging/process-statement-message')
const mockStatement = require('../../mocks/statement-data')
const { VALIDATION } = require('../../../app/errors')
let receiver

const mockValidationImplementation = () => {
  const err = new Error('Validation error')
  err.category = VALIDATION
  throw err
}

describe('process statement message', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    receiver = {
      completeMessage: jest.fn(),
      deadLetterMessage: jest.fn()
    }
  })

  test('completes message on success', async () => {
    const message = {
      body: mockStatement
    }
    await processStatementMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledWith(message)
  })

  test('completes message on success only once', async () => {
    const message = {
      body: mockStatement
    }
    await processStatementMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledTimes(1)
  })

  test('calls validate statement', async () => {
    const message = {
      body: mockStatement
    }
    await processStatementMessage(message, receiver)
    expect(mockValidation).toHaveBeenCalledWith(message.body)
  })

  test('calls validate statement only once', async () => {
    const message = {
      body: mockStatement
    }
    await processStatementMessage(message, receiver)
    expect(mockValidation).toHaveBeenCalledTimes(1)
  })

  test('calls generator with statement', async () => {
    const message = {
      body: mockStatement
    }
    await processStatementMessage(message, receiver)
    expect(mockGenerator).toHaveBeenCalledWith(message.body)
  })

  test('calls generator with statement only once', async () => {
    const message = {
      body: mockStatement
    }
    await processStatementMessage(message, receiver)
    expect(mockGenerator).toHaveBeenCalledTimes(1)
  })

  test('does not complete message on error', async () => {
    const message = {
      body: mockStatement
    }
    mockGenerator.mockImplementation(() => { throw new Error('Unable to generate') })
    await processStatementMessage(message, receiver)
    expect(receiver.completeMessage).not.toHaveBeenCalled()
  })

  test('does not dead letter message on non-validation error', async () => {
    const message = {
      body: mockStatement
    }
    mockGenerator.mockImplementation(() => { throw new Error('Unable to generate') })
    await processStatementMessage(message, receiver)
    expect(receiver.deadLetterMessage).not.toHaveBeenCalled()
  })

  test('dead letters message if validation error', async () => {
    const message = {
      body: mockStatement
    }
    mockValidation.mockImplementation(() => mockValidationImplementation())
    await processStatementMessage(message, receiver)
    expect(receiver.deadLetterMessage).toHaveBeenCalledWith(message)
  })

  test('dead letters message only once if validation error', async () => {
    const message = {
      body: mockStatement
    }
    mockValidation.mockImplementation(() => mockValidationImplementation())
    await processStatementMessage(message, receiver)
    expect(receiver.deadLetterMessage).toHaveBeenCalledTimes(1)
  })

  test('does not complete message if validation error', async () => {
    const message = {
      body: mockStatement
    }
    mockValidation.mockImplementation(() => mockValidationImplementation())
    await processStatementMessage(message, receiver)
    expect(receiver.completeMessage).not.toHaveBeenCalled()
  })

  test('does not dead letter message on non-validation error', async () => {
    const message = {
      body: mockStatement
    }
    mockGenerator.mockImplementation(() => {
      throw new Error('A generation error')
    })
    await processStatementMessage(message, receiver)
    expect(receiver.deadLetterMessage).not.toHaveBeenCalled()
  })

  test('does not complete message on non-validation error', async () => {
    const message = {
      body: mockStatement
    }
    mockGenerator.mockImplementation(() => {
      throw new Error('A generation error')
    })
    await processStatementMessage(message, receiver)
    expect(receiver.completeMessage).not.toHaveBeenCalled()
  })
})
