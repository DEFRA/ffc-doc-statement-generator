const { PUBLISH_ERROR } = require('../../../app/constants/alerts')
const { SOURCE } = require('../../../app/constants/source')

describe('createAlerts', () => {
  let EventPublisherMock, publishEventsMock
  beforeEach(() => {
    publishEventsMock = jest.fn()
    EventPublisherMock = jest.fn().mockImplementation(() => ({ publishEvents: publishEventsMock }))
    jest.resetModules()
    jest.doMock('ffc-pay-event-publisher', () => ({ EventPublisher: EventPublisherMock }))
    jest.doMock('../../../app/config/message', () => ({ alertTopic: 'mock-topic' }))
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.dontMock('ffc-pay-event-publisher')
    jest.dontMock('../../../app/config/message')
  })

  test('publishes alerts for each error', async () => {
    const errors = [{ file: 'file1', message: 'err1' }, { file: 'file2', message: 'err2' }]
    const { createAlerts } = require('../../../app/messaging/create-alerts')
    await createAlerts(errors)
    expect(EventPublisherMock).toHaveBeenCalledWith('mock-topic')
    expect(publishEventsMock).toHaveBeenCalledWith([
      { source: SOURCE, type: PUBLISH_ERROR, data: errors[0] },
      { source: SOURCE, type: PUBLISH_ERROR, data: errors[1] }
    ])
  })

  test('does not publish if errors is empty', async () => {
    const { createAlerts } = require('../../../app/messaging/create-alerts')
    await createAlerts([])
    expect(EventPublisherMock).not.toHaveBeenCalled()
    expect(publishEventsMock).not.toHaveBeenCalled()
  })

  test('does not publish if errors is undefined', async () => {
    const { createAlerts } = require('../../../app/messaging/create-alerts')
    await createAlerts(undefined)
    expect(EventPublisherMock).not.toHaveBeenCalled()
    expect(publishEventsMock).not.toHaveBeenCalled()
  })
})
