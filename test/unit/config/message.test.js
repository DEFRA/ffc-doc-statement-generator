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
    process.env.RETENTION_SUBSCRIPTION_ADDRESS = 'retention-sub-addr'
    process.env.RETENTION_TOPIC_ADDRESS = 'retention-topic-addr'
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
    expect(config.retentionSubscription).toBeDefined()
    expect(config.publishTopic).toBeDefined()
    expect(config.crmTopic).toBeDefined()
    expect(config.alertTopic).toBeDefined()
  })

  test.each([
    ['statementSubscription', 'sub-addr', 'topic-addr', 'subscription', 3],
    ['retentionSubscription', 'retention-sub-addr', 'retention-topic-addr', 'subscription', 3],
    ['publishTopic', 'pub-addr', undefined, undefined, undefined],
    ['crmTopic', 'crm-addr', undefined, undefined, undefined],
    ['alertTopic', 'alert-addr', undefined, undefined, undefined]
  ])('merges messageQueue and %s', (key, address, topic, type, maxConcurrentCalls) => {
    const config = require('../../../app/config/message')
    const expected = {
      host: 'host',
      username: 'user',
      password: 'pass',
      address
    }
    if (topic) expected.topic = topic
    if (type) expected.type = type
    if (maxConcurrentCalls !== undefined) expected.maxConcurrentCalls = maxConcurrentCalls
    expect(config[key]).toMatchObject(expected)
  })

  test('statementSubscription has maxConcurrentCalls of 3', () => {
    const config = require('../../../app/config/message')
    expect(config.statementSubscription.maxConcurrentCalls).toBe(3)
  })

  test('retentionSubscription has maxConcurrentCalls of 3', () => {
    const config = require('../../../app/config/message')
    expect(config.retentionSubscription.maxConcurrentCalls).toBe(3)
  })
})
