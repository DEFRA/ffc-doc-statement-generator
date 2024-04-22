const getStatementDate = require('../../../app/generator/content/sfi23-quarterly-statement/get-statement-date')

describe('getStatementDate', () => {
  test('should correctly generate the statement date', () => {
    const mockTransactionDate = '1 January 2024'

    const statementDate = getStatementDate(mockTransactionDate)

    expect(statementDate).toHaveProperty('columns')
    expect(statementDate.columns).toContainEqual({ width: 200, text: 'Statement date:' })
    expect(statementDate.columns).toContainEqual({ width: '*', text: mockTransactionDate })
    expect(statementDate).toHaveProperty('style', 'column')
    expect(statementDate).toHaveProperty('columnGap', 10)
  })
})
