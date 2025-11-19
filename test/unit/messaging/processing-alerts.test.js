jest.mock('../../../app/messaging/create-alerts', () => ({
  createAlerts: jest.fn()
}))

const { createAlerts } = require('../../../app/messaging/create-alerts')
const { dataProcessingAlert, deriveAlertData } = require('../../../app/messaging/processing-alerts')

describe('deriveAlertData', () => {
  const simpleCases = [
    {
      name: 'keeps existing non-empty message unchanged',
      payload: { process: 'my-process', message: 'already present', error: { foo: 'bar' } },
      expected: { message: 'already present', process: 'my-process', error: { foo: 'bar' } }
    },
    {
      name: 'extracts message from error object with message and keeps original error object',
      payload: { process: 'proc2', message: null, error: { message: 'obj message', code: 123 } },
      expected: { message: 'obj message', process: 'proc2', error: { message: 'obj message', code: 123 } }
    },
    {
      name: 'uses string error as message and clears error to null',
      payload: { process: 'sproc', message: '   ', error: 'simple string error' },
      expected: { message: 'simple string error', process: 'sproc', error: null }
    },
    {
      name: 'uses default message when no message and no error',
      payload: { process: 'noerr' },
      expected: (result) => {
        expect(result.message).toBe('Failed processing noerr')
        expect(Object.prototype.hasOwnProperty.call(result, 'error')).toBe(false)
      }
    }
  ]

  test.each(simpleCases)('$name', ({ payload, expected }) => {
    const result = deriveAlertData(payload, payload.process)
    if (typeof expected === 'function') {
      expected(result)
    } else {
      expect(result).toMatchObject(expected)
    }
  })

  test('extracts message from Error instance and replaces error with {message, stack}', () => {
    const err = new Error('boom happened')
    const payload = { process: 'proc', message: '', error: err }
    const result = deriveAlertData(payload, 'proc')
    expect(result.message).toBe('boom happened')
    expect(result.process).toBe('proc')
    expect(result.error).toBeDefined()
    expect(result.error.message).toBe('boom happened')
    expect(typeof result.error.stack).toBe('string')
  })
})

describe('dataProcessingAlert (integration with publish/createAlerts)', () => {
  let consoleErrorSpy

  beforeEach(() => {
    jest.clearAllMocks()
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  test('calls createAlerts with the derived alert data array and type argument', async () => {
    createAlerts.mockResolvedValueOnce()
    const payload = { process: 'p1', message: 'm1' }
    await expect(dataProcessingAlert(payload, 'CUSTOM_TYPE')).resolves.toBeUndefined()
    expect(createAlerts).toHaveBeenCalledTimes(1)
    const [alertArray, passedType] = createAlerts.mock.calls[0]
    expect(Array.isArray(alertArray)).toBe(true)
    expect(alertArray[0]).toMatchObject({ process: 'p1', message: 'm1' })
    expect(passedType).toBe('CUSTOM_TYPE')
  })

  test('logs error and does not throw when publish fails and throwOnPublishError is false', async () => {
    createAlerts.mockRejectedValueOnce(new Error('publish failed'))
    const payload = { process: 'p2' }
    await expect(dataProcessingAlert(payload)).resolves.toBeUndefined()
    expect(createAlerts).toHaveBeenCalledTimes(1)
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
    expect(consoleErrorSpy.mock.calls[0][0]).toMatch(/Failed to publish processing alert for p2/)
  })

  test('rethrows when publish fails and throwOnPublishError is true', async () => {
    createAlerts.mockRejectedValueOnce(new Error('fatal publish'))
    const payload = { process: 'p3' }
    await expect(dataProcessingAlert(payload, undefined, { throwOnPublishError: true })).rejects.toThrow('fatal publish')
    expect(createAlerts).toHaveBeenCalledTimes(1)
  })

  const invalidPayloads = [
    [null, TypeError],
    [123, TypeError],
    [{}, TypeError],
    [{ process: 123 }, TypeError]
  ]

  test.each(invalidPayloads)('throws TypeError when payload is invalid: %p', async (payload, errorType) => {
    await expect(dataProcessingAlert(payload)).rejects.toThrow(errorType)
  })
})
