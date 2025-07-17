describe('message config', () => {
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

  test('merges messageQueue and statementSubscription', () => {
    const config = require('../../../app/config/message')
    expect(config.statementSubscription).toMatchObject({
      host: 'host',
      username: 'user',
      password: 'pass',
      address: 'sub-addr',
      topic: 'topic-addr',
      type: 'subscription'
    })
  })

  test('merges messageQueue and publishTopic', () => {
    const config = require('../../../app/config/message')
    expect(config.publishTopic).toMatchObject({
      host: 'host',
      username: 'user',
      password: 'pass',
      address: 'pub-addr'
    })
  })

  test('merges messageQueue and crmTopic', () => {
    const config = require('../../../app/config/message')
    expect(config.crmTopic).toMatchObject({
      host: 'host',
      username: 'user',
      password: 'pass',
      address: 'crm-addr'
    })
  })

  test('merges messageQueue and alertTopic', () => {
    const config = require('../../../app/config/message')
    expect(config.alertTopic).toMatchObject({
      host: 'host',
      username: 'user',
      password: 'pass',
      address: 'alert-addr'
    })
  })
})
