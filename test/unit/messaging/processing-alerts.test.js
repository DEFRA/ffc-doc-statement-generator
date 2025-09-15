jest.mock('../../../app/messaging/create-alerts', () => ({
  createAlerts: jest.fn()
}))

const { createAlerts } = require('../../../app/messaging/create-alerts')
const { dataProcessingAlert, deriveAlertData } = require('../../../app/messaging/processing-alerts')

describe('deriveAlertData', () => {
  test('keeps existing non-empty message unchanged', () => {
    const payload = { process: 'my-process', message: 'already present', error: { foo: 'bar' } }
    const result = deriveAlertData(payload, 'my-process')
    expect(result.message).toBe('already present')
    expect(result.error).toEqual({ foo: 'bar' })
    expect(result.process).toBe('my-process')
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

  test('extracts message from error object with message and keeps original error object', () => {
    const errObj = { message: 'obj message', code: 123 }
    const payload = { process: 'proc2', message: null, error: errObj }
    const result = deriveAlertData(payload, 'proc2')
    expect(result.message).toBe('obj message')
    expect(result.error).toBe(errObj)
  })

  test('uses string error as message and clears error to null', () => {
    const payload = { process: 'sproc', message: '   ', error: 'simple string error' }
    const result = deriveAlertData(payload, 'sproc')
    expect(result.message).toBe('simple string error')
    expect(result.error).toBeNull()
  })

  test('uses default message when no message and no error', () => {
    const payload = { process: 'noerr' /* no message, no error */ }
    const result = deriveAlertData(payload, 'noerr')
    expect(result.message).toBe('Failed processing noerr')
    expect(Object.prototype.hasOwnProperty.call(result, 'error')).toBe(false)
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

  test('throws TypeError when payload is not an object', async () => {
    await expect(dataProcessingAlert(null)).rejects.toThrow(TypeError)
    await expect(dataProcessingAlert(123)).rejects.toThrow(TypeError)
  })

  test('throws TypeError when payload.process is missing or not a string', async () => {
    await expect(dataProcessingAlert({})).rejects.toThrow(TypeError)
    await expect(dataProcessingAlert({ process: 123 })).rejects.toThrow(TypeError)
  })
})
