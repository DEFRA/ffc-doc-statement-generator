const { DATA_PUBLISHING_ERROR } = require('../../../app/constants/alerts')
const { SOURCE } = require('../../../app/constants/source')

describe('createAlerts', () => {
  let EventPublisherMock, publishEventsMock, createAlerts

  beforeEach(() => {
    publishEventsMock = jest.fn()
    EventPublisherMock = jest.fn().mockImplementation(() => ({ publishEvents: publishEventsMock }))

    jest.resetModules()
    jest.doMock('ffc-pay-event-publisher', () => ({ EventPublisher: EventPublisherMock }))
    jest.doMock('../../../app/config/message', () => ({ alertTopic: 'mock-topic' }))

    createAlerts = require('../../../app/messaging/create-alerts').createAlerts
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.dontMock('ffc-pay-event-publisher')
    jest.dontMock('../../../app/config/message')
  })

  test('maps non-alert-array inputs via createAlert (error objects) and publishes', async () => {
    const errors = [{ file: 'file1', message: 'err1' }, { file: 'file2', message: 'err2' }]
    await createAlerts(errors)

    expect(EventPublisherMock).toHaveBeenCalledWith('mock-topic')
    expect(publishEventsMock).toHaveBeenCalledTimes(1)
    expect(publishEventsMock).toHaveBeenCalledWith(
      errors.map((e) => ({ source: SOURCE, type: DATA_PUBLISHING_ERROR, data: e }))
    )
  })

  test.each([[], undefined])('does not publish if errors is %p (early return)', async (input) => {
    await createAlerts(input)
    expect(EventPublisherMock).not.toHaveBeenCalled()
    expect(publishEventsMock).not.toHaveBeenCalled()
  })

  test('publishes mapped alerts when inputs is an alert-array and respects provided type fallback', async () => {
    const inputs = [
      { source: 'custom-source', type: 'CUSTOM_TYPE', data: { foo: 'bar' } },
      { data: { baz: 'qux' } }
    ]
    const fallbackType = 'MY_FALLBACK_TYPE'

    await createAlerts(inputs, fallbackType)

    const expected = [
      { source: 'custom-source', type: 'CUSTOM_TYPE', data: { foo: 'bar' } },
      { source: SOURCE, type: fallbackType, data: { baz: 'qux' } }
    ]

    expect(EventPublisherMock).toHaveBeenCalledWith('mock-topic')
    expect(publishEventsMock).toHaveBeenCalledWith(expected)
  })

  test('alert-array missing type with no fallback uses DATA_PUBLISHING_ERROR', async () => {
    const inputs = [{ data: { x: 1 } }]
    await createAlerts(inputs)
    expect(publishEventsMock).toHaveBeenCalledWith([{ source: SOURCE, type: DATA_PUBLISHING_ERROR, data: { x: 1 } }])
  })

  test('mixed array (some elements not alert-like) treated as non-alert-array', async () => {
    const inputs = [{ source: 's', type: 'T', data: { a: 1 } }, 'not-an-object']
    await createAlerts(inputs, 'MYTYPE')
    expect(EventPublisherMock).toHaveBeenCalledWith('mock-topic')
    expect(publishEventsMock).toHaveBeenCalledTimes(1)
  })

  test('propagates publishEvents rejection', async () => {
    const publishError = new Error('publish failed')
    publishEventsMock.mockRejectedValueOnce(publishError)
    const inputs = [{ source: 'x', type: 'T', data: { a: 1 } }]

    await expect(createAlerts(inputs)).rejects.toBe(publishError)
    expect(EventPublisherMock).toHaveBeenCalledTimes(1)
    expect(publishEventsMock).toHaveBeenCalledTimes(1)
  })
})
