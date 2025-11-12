const getStatementDate = require('../../../../../app/generator/content/delinked-statement/get-statement-date')

describe('getStatementDate', () => {
  test.each([
    ['1 January 2024'],
    ['15 February 2025'],
    ['31 December 2023']
  ])('should correctly generate the statement date for %s', (mockTransactionDate) => {
    const statementDate = getStatementDate(mockTransactionDate)

    expect(statementDate).toHaveProperty('columns')
    expect(statementDate.columns).toContainEqual({ width: 200, text: 'Statement date:' })
    expect(statementDate.columns).toContainEqual({ width: '*', text: mockTransactionDate })
    expect(statementDate).toHaveProperty('style', 'column')
    expect(statementDate).toHaveProperty('columnGap', 10)
  })
})
