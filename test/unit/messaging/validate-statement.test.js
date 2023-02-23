const validateStatement = require('../../../app/messaging/validate-statement')
const mockStatement = require('../../mocks/statement-data')

describe('validate message body can be processed as statement', () => {
  test('does not throw on valid statement', async () => {
    expect(() => validateStatement(mockStatement)).not.toThrow()
  })

  test('throws on undefined statement', async () => {
    expect(() => validateStatement(undefined)).toThrow()
  })

  test('throws on missing statement', async () => {
    expect(() => validateStatement()).toThrow()
  })

  test('throws on empty statement', async () => {
    expect(() => validateStatement({})).toThrow()
  })

  test('throws on array statement', async () => {
    expect(() => validateStatement([])).toThrow()
  })

  test('throws on true statement', async () => {
    expect(() => validateStatement(true)).toThrow()
  })

  test('throws on false statement', async () => {
    expect(() => validateStatement(false)).toThrow()
  })

  test('throws on 0 statement', async () => {
    expect(() => validateStatement(0)).toThrow()
  })

  test('throws on 1 statement', async () => {
    expect(() => validateStatement(1)).toThrow()
  })

  test('throws on empty string statement', async () => {
    expect(() => validateStatement('')).toThrow()
  })

  test('throws on string statement', async () => {
    expect(() => validateStatement('statement')).toThrow()
  })
})
