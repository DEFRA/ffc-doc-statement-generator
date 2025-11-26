describe('messageConfig', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
    process.env.MESSAGE_QUEUE_HOST = 'host'
    process.env.MESSAGE_QUEUE_USER = 'user'
    process.env.MESSAGE_QUEUE_PASSWORD = 'pass'
    process.env.NODE_ENV = 'test'
    process.env.STATEMENT_SUBSCRIPTION_ADDRESS = 'sub-addr'
    process.env.STATEMENT_TOPIC_ADDRESS = 'topic-addr'
    process.env.PUBLISH_TOPIC_ADDRESS = 'pub-addr'
    process.env.CRM_TOPIC_ADDRESS = 'crm-addr'
    process.env.ALERT_TOPIC_ADDRESS = 'alert-addr'
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  test('exports valid config objects', () => {
    const config = require('../../../app/config/message')
    expect(config.statementSubscription).toBeDefined()
    expect(config.publishTopic).toBeDefined()
    expect(config.crmTopic).toBeDefined()
    expect(config.alertTopic).toBeDefined()
  })

  test.each([
    ['statementSubscription', 'sub-addr', 'topic-addr', 'subscription'],
    ['publishTopic', 'pub-addr', undefined, undefined],
    ['crmTopic', 'crm-addr', undefined, undefined],
    ['alertTopic', 'alert-addr', undefined, undefined]
  ])('merges messageQueue and %s', (key, address, topic, type) => {
    const config = require('../../../app/config/message')
    const expected = {
      host: 'host',
      username: 'user',
      password: 'pass',
      address
    }
    if (topic) expected.topic = topic
    if (type) expected.type = type
    expect(config[key]).toMatchObject(expected)
  })
})
