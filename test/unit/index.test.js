jest.mock('../../app/insights', () => ({
  setup: jest.fn()
}))
jest.mock('log-timestamp', () => jest.fn())
jest.mock('ffc-pay-event-publisher', () => ({
  EventPublisher: jest.fn()
}))
jest.mock('../../app/constants/alerts', () => ({
  DATA_PUBLISHING_ERROR: 'data-publishing-error'
}))
jest.mock('../../app/constants/source', () => ({
  SOURCE: 'test-source'
}))
jest.mock('../../app/config/message', () => ({
  alertTopic: 'test-topic'
}))
jest.mock('../../app/messaging', () => ({
  start: jest.fn(),
  stop: jest.fn()
}))
jest.mock('../../app/publishing', () => ({
  start: jest.fn()
}))
jest.mock('../../app/storage', () => ({
  initialiseContainers: jest.fn()
}))

describe('Startup script', () => {
  let alertingMock

  beforeEach(() => {
    jest.resetModules()
    alertingMock = {
      init: jest.fn()
    }
    jest.doMock('ffc-alerting-utils', () => alertingMock)
  })

  test('should initialize alerting with config if init exists', async () => {
    await require('../../app/index')
    
    expect(alertingMock.init).toHaveBeenCalledWith({
      topic: 'test-topic',
      source: 'test-source',
      defaultType: 'data-publishing-error',
      EventPublisherClass: expect.any(Function)
    })
  })

  test('should set environment variables if alerting.init is missing', async () => {
    jest.doMock('ffc-alerting-utils', () => ({}))
    await require('../../app/index')

    expect(process.env.ALERT_TOPIC).toBe(JSON.stringify('test-topic'))
    expect(process.env.ALERT_SOURCE).toBe('test-source')
    expect(process.env.ALERT_TYPE).toBe('data-publishing-error')
  })

  test('should log warning if alerting init throws', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    jest.doMock('ffc-alerting-utils', () => {
      throw new Error('Boom')
    })

    await require('../../app/index')

    expect(consoleSpy).toHaveBeenCalledWith('Failed to initialize alerting utils:', 'Boom')
    consoleSpy.mockRestore()
  })

  test('should start messaging and publishing after initializing containers', async () => {
    const { initialiseContainers } = require('../../app/storage')
    const { start: messagingStart } = require('../../app/messaging')
    const { start: publishingStart } = require('../../app/publishing')

    await require('../../app/index')

    expect(initialiseContainers).toHaveBeenCalled()
    expect(messagingStart).toHaveBeenCalled()
    expect(publishingStart).toHaveBeenCalled()
  })
})