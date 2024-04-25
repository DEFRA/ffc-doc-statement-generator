describe('jest.setTimeout', () => {
  test('should set the timeout to 30000 ms', async () => {
    const start = Date.now()
    await new Promise(resolve => setTimeout(resolve, 29000)) // slightly less than 30000 to avoid the test itself timing out
    const duration = Date.now() - start
    expect(duration).toBeGreaterThanOrEqual(29000)
  })
})
