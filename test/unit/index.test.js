jest.mock('../../app/messaging')
const mockMessaging = require('../../app/messaging')
jest.mock('../../app/publishing')
const mockPublishing = require('../../app/publishing')
jest.mock('../../app/storage')
const mockStorage = require('../../app/storage')

describe('app', () => {
  beforeEach(() => {
    require('../../app')
  })

  test('starts messaging', async () => {
    expect(mockMessaging.start).toHaveBeenCalled()
  })

  test('starts publishing', async () => {
    expect(mockPublishing.start).toHaveBeenCalled()
  })

  test('initialises containers', async () => {
    expect(mockStorage.initialiseContainers).toHaveBeenCalled()
  })
})
