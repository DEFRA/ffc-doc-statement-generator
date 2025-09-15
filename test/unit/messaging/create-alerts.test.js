const { DATA_PUBLISHING_ERROR } = require('../../../app/constants/alerts')
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

  test('maps non-alert-array inputs via createAlert (error objects) and publishes', async () => {
    const errors = [{ file: 'file1', message: 'err1' }, { file: 'file2', message: 'err2' }]
    const { createAlerts } = require('../../../app/messaging/create-alerts')

    await createAlerts(errors)

    expect(EventPublisherMock).toHaveBeenCalledWith('mock-topic')
    expect(publishEventsMock).toHaveBeenCalledTimes(1)

    expect(publishEventsMock).toHaveBeenCalledWith([
      { source: SOURCE, type: DATA_PUBLISHING_ERROR, data: errors[0] },
      { source: SOURCE, type: DATA_PUBLISHING_ERROR, data: errors[1] }
    ])
  })

  test('does not publish if errors is empty (early return)', async () => {
    const { createAlerts } = require('../../../app/messaging/create-alerts')
    await createAlerts([])
    expect(EventPublisherMock).not.toHaveBeenCalled()
    expect(publishEventsMock).not.toHaveBeenCalled()
  })

  test('does not publish if errors is undefined (early return)', async () => {
    const { createAlerts } = require('../../../app/messaging/create-alerts')
    await createAlerts(undefined)
    expect(EventPublisherMock).not.toHaveBeenCalled()
    expect(publishEventsMock).not.toHaveBeenCalled()
  })

  test('publishes mapped alerts when inputs is an alert-array (isAlertArray true) and respects provided type fallback', async () => {
    const inputs = [
      { source: 'custom-source', type: 'CUSTOM_TYPE', data: { foo: 'bar' } },
      { data: { baz: 'qux' } }
    ]

    const { createAlerts } = require('../../../app/messaging/create-alerts')

    const fallbackType = 'MY_FALLBACK_TYPE'
    await createAlerts(inputs, fallbackType)

    expect(EventPublisherMock).toHaveBeenCalledWith('mock-topic')
    expect(publishEventsMock).toHaveBeenCalledTimes(1)

    const expectedAlerts = [
      { source: 'custom-source', type: 'CUSTOM_TYPE', data: { foo: 'bar' } },
      { source: SOURCE, type: fallbackType, data: { baz: 'qux' } }
    ]

    expect(publishEventsMock).toHaveBeenCalledWith(expectedAlerts)
  })

  test('when inputs is an alert-array and no fallback type param provided, missing type falls back to DATA_PUBLISHING_ERROR', async () => {
    const inputs = [
      { data: { x: 1 } } // missing type -> should fall back to default DATA_PUBLISHING_ERROR
    ]
    const { createAlerts } = require('../../../app/messaging/create-alerts')

    await createAlerts(inputs) // no type param -> default DATA_PUBLISHING_ERROR

    expect(publishEventsMock).toHaveBeenCalledWith([
      { source: SOURCE, type: DATA_PUBLISHING_ERROR, data: { x: 1 } }
    ])
  })

  test('mixed array (some elements not alert-like) -> treated as non-alert-array (createAlert used)', async () => {
    const inputs = [
      { source: 's', type: 'T', data: { a: 1 } },
      'not-an-object'
    ]
    const { createAlerts } = require('../../../app/messaging/create-alerts')

    await createAlerts(inputs, 'MYTYPE')

    expect(publishEventsMock).toHaveBeenCalledTimes(1)
    expect(EventPublisherMock).toHaveBeenCalledWith('mock-topic')
  })

  test('propagates publishEvents rejection (publish error path)', async () => {
    const publishError = new Error('publish failed')
    publishEventsMock.mockRejectedValueOnce(publishError)

    const inputs = [{ source: 'x', type: 'T', data: { a: 1 } }]
    const { createAlerts } = require('../../../app/messaging/create-alerts')

    await expect(createAlerts(inputs)).rejects.toBe(publishError)

    expect(EventPublisherMock).toHaveBeenCalledTimes(1)
    expect(publishEventsMock).toHaveBeenCalledTimes(1)
  })
})
