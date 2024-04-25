const fs = require('fs')
const path = require('path')

describe('jest.setup.js', () => {
  test('should contain specific timeout configuration', () => {
    const setupFilePath = path.join(__dirname, '../jest.setup.js') // Adjust path if necessary
    const setupFileContent = fs.readFileSync(setupFilePath, 'utf-8')

    expect(setupFileContent).toContain('const number30000 = 30000')
    expect(setupFileContent).toContain('jest.setTimeout(number30000)')
  })
})
