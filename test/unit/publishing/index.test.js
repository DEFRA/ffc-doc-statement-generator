const config = require('../../../app/config')
const { start } = require('../../../app/publishing')
const { publishStatements } = require('../../../app/publishing/publish-statements')

jest.mock('../../../app/config')
jest.mock('../../../app/publishing/publish-statements')

describe('start function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call publishStatements', async () => {
    config.publishingFrequency = 60000

    await start()

    expect(publishStatements).toHaveBeenCalled()
  })

  test('should catch and log errors from publishStatements', async () => {
    console.error = jest.fn()
    config.publishingFrequency = 60000

    publishStatements.mockRejectedValue(new Error('Publish error'))

    await start()

    expect(console.error).toHaveBeenCalledWith(expect.any(Error))
    expect(console.error).toHaveBeenCalledWith(expect.objectContaining({ message: 'Publish error' }))
  })
})
