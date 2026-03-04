const config = require('../../../app/config')
const { start } = require('../../../app/publishing')
const { publishStatements } = require('../../../app/publishing/publish-statements')

jest.mock('../../../app/config')
jest.mock('../../../app/publishing/publish-statements')

jest.mock('../../../app/publishing/window-helpers', () => ({
  isWithinWindow: jest.fn(),
  isPollDay: jest.fn()
}))
const { isWithinWindow, isPollDay } = require('../../../app/publishing/window-helpers')

describe('start function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    config.publishingFrequency = 60000
    config.pollWindow.enabled = true
  })

  test('should call publishStatements', async () => {
    isWithinWindow.mockReturnValue(true)
    isPollDay.mockReturnValue(true)

    await start()

    expect(publishStatements).toHaveBeenCalled()
  })

  test('should not call publishStatements if outside window', async () => {
    isWithinWindow.mockReturnValue(false)
    isPollDay.mockReturnValue(true)
    await start()

    expect(publishStatements).not.toHaveBeenCalled()
  })

  test('should not call publishStatements if not a polling day', async () => {
    isWithinWindow.mockReturnValue(true)
    isPollDay.mockReturnValue(false)
    await start()

    expect(publishStatements).not.toHaveBeenCalled()
  })

  test('should catch and log errors from publishStatements', async () => {
    console.error = jest.fn()
    isWithinWindow.mockReturnValue(true)
    isPollDay.mockReturnValue(true)

    publishStatements.mockRejectedValue(new Error('Publish error'))

    await start()

    expect(console.error).toHaveBeenCalledWith(expect.any(Error))
    expect(console.error).toHaveBeenCalledWith(expect.objectContaining({ message: 'Publish error' }))
  })
})
