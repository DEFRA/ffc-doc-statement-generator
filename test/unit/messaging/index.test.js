<<<<<<< HEAD
jest.mock('ffc-messaging')
jest.mock('../../../app/database')
=======
jest.mock('../../../app/messaging/service-bus', () => ({
  createServiceBusClient: jest.fn(),
  createReceiver: jest.fn(),
  subscribeReceiver: jest.fn(),
  closeSenders: jest.fn()
}))
jest.mock('../../../app/data')
>>>>>>> 8b025d4 (replace ffc-messaging with service-bus (#116))
const messageService = require('../../../app/messaging')

describe('messaging', () => {
  afterAll(async () => {
    await messageService.stop()
  })

  test('runs', async () => {
    await messageService.start()
  })
})
