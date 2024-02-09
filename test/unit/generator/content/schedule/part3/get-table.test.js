const { getTable } = require('../../../../../../app/generator/content/schedule/part3/get-table')
const toCurrencyString = require('../../../../../../app/generator/to-currency-string')

let mockSchedule

describe('get table', () => {
  beforeEach(() => {
    mockSchedule = JSON.parse(JSON.stringify(require('../../../../../mocks/mock-schedule').topUpSchedule))
  })

  test('includes table with number of rows equal schedule length + 1 ', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.table.body.length).toBe(mockSchedule.schedule.length + 1)
  })

  test('includes table with 3 fixed columns', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.table.widths.length).toBe(3)
  })

  test('includes table with five rows when four instalments', () => {
    mockSchedule.schedule.pop()
    const result = getTable(mockSchedule.schedule)
    expect(result.table.body.length).toBe(mockSchedule.schedule.length + 1)
  })

  test('includes table with four rows when three instalments', () => {
    mockSchedule.schedule.pop()
    mockSchedule.schedule.pop()
    const result = getTable(mockSchedule.schedule)
    expect(result.table.body.length).toBe(mockSchedule.schedule.length + 1)
  })

  test('should use auto width columns for every column', () => {
    const result = getTable(mockSchedule.schedule)
    result.table.widths.forEach(width => {
      expect(width).toBe('*')
    })
  })

  test('should use solid line style for grid', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.layout.hLineStyle()).toBe('solid')
    expect(result.layout.vLineStyle()).toBe('solid')
  })

  test('should use table style', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.style).toBe('table')
  })

  test('should use tableHeader style for header row', () => {
    const result = getTable(mockSchedule.schedule)
    result.table.body[0].forEach(cell => {
      expect(cell.style).toBe('tableHeader')
    })
  })

  test('should use tableNumber style for other cells that are not header row', () => {
    const result = getTable(mockSchedule.schedule)
    result.table.body.filter((r, i) => i > 0).forEach(row => {
      const valueRows = row.filter((x, i) => i > 0)
      valueRows.forEach(cell => {
        expect(cell.style).toBe('tableNumber')
      })
    })
  })

  test('header is Payment type for first row', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.table.body[0][0].text).toBe('Payment type')
  })

  test('header is Immediate payment for second row', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.table.body[1][0].text).toBe('Immediate payment')
  })

  test('header is Quarterly payment for third row', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.table.body[2][0].text).toBe('Quarterly payment')
  })

  test('includes first payment period as second column of second row', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.table.body[1][1].text).toBe(mockSchedule.schedule[0].period)
  })

  test('includes first payment values as third column of second row', () => {
    const result = getTable(mockSchedule.schedule)
    expect(result.table.body[1][2].text).toBe(toCurrencyString(mockSchedule.schedule[0].value))
  })

  test('includes all values from schedule as values', () => {
    const result = getTable(mockSchedule.schedule)
    mockSchedule.schedule.forEach((instalment, i) => {
      expect(result.table.body[i + 1][2].text).toBe(toCurrencyString(instalment.value))
    })
  })

  test('includes all period from schedule', () => {
    const result = getTable(mockSchedule.schedule)
    mockSchedule.schedule.forEach((instalment, i) => {
      expect(result.table.body[i + 1][1].text).toBe(instalment.period)
    })
  })
})
