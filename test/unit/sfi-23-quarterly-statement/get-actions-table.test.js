const getActionsTable = require('../../../app/generator/content/sfi23-quarterly-statement/part3/get-actions-table')

describe('getActionsTable', () => {
  test('should return a table with the correct structure', () => {
    const actionGroups = [
      {
        groupName: 'Group 1',
        actions: [
          {
            actionCode: 'A1',
            actionName: 'Action 1',
            rate: 1,
            landArea: 100,
            uom: 'ha',
            annualValue: 1000,
            quarterlyPaymentAmount: '250'
          },
          {
            actionCode: 'A2',
            actionName: 'Action 2',
            rate: 2,
            landArea: 200,
            uom: 'ha',
            annualValue: 2000,
            quarterlyPaymentAmount: '500'
          }
        ]
      }
    ]
    const title = 'Test Title'
    const showGroupName = true
    const totalpayment = '750'

    const result = getActionsTable(actionGroups, title, showGroupName, totalpayment)

    expect(result).toHaveProperty('layout')
    expect(result).toHaveProperty('style', 'table')
    expect(result).toHaveProperty('table')
    expect(result.table).toHaveProperty('headerRows', 1)
    expect(result.table).toHaveProperty('widths', ['*', '*', '*', '*', '*', '*'])
    expect(result.table).toHaveProperty('body')
    expect(result.table.body.length).toBe(actionGroups.length * actionGroups[0].actions.length + 4)
    expect(result.layout.hLineStyle()).toBe('solid')
    expect(result.layout.vLineStyle()).toBe('solid')
  })
})
