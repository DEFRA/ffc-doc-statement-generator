const fs = require('fs')
const path = require('path')

describe('jest.setTimeout', () => {
  test('should set the timeout to 30000 ms', async () => {
    const start = Date.now()
    await new Promise(resolve => setTimeout(resolve, 29000)) // slightly less than 30000 to avoid the test itself timing out
    const duration = Date.now() - start
    expect(duration).toBeGreaterThanOrEqual(29000)
  })
})

describe('jest.setup.js', () => {
  test('should contain specific timeout configuration', () => {
    const setupFilePath = path.join(__dirname, '../jest.setup.js')
    const setupFileContent = fs.readFileSync(setupFilePath, 'utf-8')

    expect(setupFileContent).toContain('const number30000 = 30000')
    expect(setupFileContent).toContain('jest.setTimeout(number30000)')
  })
})
