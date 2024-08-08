describe('Configuration Validation', () => {
  let originalEnv

  beforeEach(() => {
    // Save the original process.env
    originalEnv = { ...process.env }
    jest.resetModules() // Clear module cache to ensure the module re-reads environment variables
  })

  afterEach(() => {
    // Restore the original process.env
    process.env = originalEnv
  })

  test('should pass validation with valid configurations', () => {
    process.env.SFI23QUARTERLYSTATEMENT_ENABLED = 'true'
    process.env.SCHEDULE_ENABLED = 'true'
    process.env.SEND_CRM_MESSAGE_ENABLED = 'true'
    process.env.SAVE_LOG_ENABLED = 'true'

    const config = require('../../app/config/publishing')

    expect(config).toEqual(expect.objectContaining({
      publishSFI23QuarterlyStatement: true,
      scheduleEnabled: true,
      sendCrmMessage: true,
      saveLogEnabled: true
    }))
  })

  test('should apply default values when environment variables are not set', () => {
    // No environment variables set
    const config = require('../../app/config/publishing')

    expect(config).toEqual(expect.objectContaining({
      publishSFI23QuarterlyStatement: true,
      scheduleEnabled: true,
      sendCrmMessage: true,
      saveLogEnabled: true
    }))
  })

  test('should throw an error with invalid configurations', () => {
    process.env.SFI23QUARTERLYSTATEMENT_ENABLED = 'not_a_boolean'
    process.env.SCHEDULE_ENABLED = 'not_a_boolean'
    process.env.SEND_CRM_MESSAGE_ENABLED = 'not_a_boolean'
    process.env.SAVE_LOG_ENABLED = 'not_a_boolean'

    expect(() => {
      require('../../app/config/publishing')
    }).toThrow('The publishing config is invalid.')
  })
})
