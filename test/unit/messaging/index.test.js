jest.mock('../../../app/messaging/service-bus', () => ({
  createServiceBusClient: jest.fn(),
  createReceiver: jest.fn(),
  subscribeReceiver: jest.fn(),
  closeSenders: jest.fn()
}))
jest.mock('../../../app/data')
const messageService = require('../../../app/messaging')

describe('messaging', () => {
  afterAll(async () => {
    await messageService.stop()
  })

  test('runs', async () => {
    await messageService.start()
  })
})
