const {
  getProgressiveReductionTable,
  formatPaymentBand,
  formatProgressiveReduction,
  formatPercentage
} = require('../../../../../../app/generator/content/delinked-statement/pr-calculations/get-progressive-reduction-table')

describe('getProgressiveReductionTable', () => {
  test('should return a correctly formatted table object', () => {
    const delinkedStatement = {
      paymentBand1: 30000,
      percentageReduction1: 50,
      progressiveReductions1: 1500,
      paymentBand2: 50000,
      percentageReduction2: 55,
      progressiveReductions2: 5000,
      paymentBand3: 150000,
      percentageReduction3: 65,
      progressiveReductions3: 22500,
      paymentBand4: 200000,
      percentageReduction4: 70,
      progressiveReductions4: 40000,
      totalProgressiveReduction: 69000
    }

    const expectedTable = {
      layout: {
        hLineStyle: expect.any(Function),
        vLineStyle: expect.any(Function)
      },
      style: 'table',
      table: {
        headerRows: 2,
        widths: ['*', '*', '*'],
        body: [
          [
            { colSpan: 3, text: 'Progressive reduction calculator', style: 'tableHeader', bold: true },
            { text: '' },
            { text: '' }
          ],
          [
            { text: 'Payment band', style: 'tableHeader' },
            { text: 'Percentage reduction', style: 'tableHeader' },
            { text: 'Progressive reduction', style: 'tableHeader' }
          ],
          [
            { text: 'Up to £30,000' },
            { text: '50%' },
            { text: '£1,500.00' }
          ],
          [
            { text: '£30,000.01 to £50,000' },
            { text: '55%' },
            { text: '£5,000.00' }
          ],
          [
            { text: '£50,000.01 to £150,000' },
            { text: '65%' },
            { text: '£22,500.00' }
          ],
          [
            { text: 'Above £150,000' },
            { text: '70%' },
            { text: '£40,000.00' }
          ],
          [
            { text: '' },
            { text: 'Total progressive reduction', bold: true },
            { text: '£69,000.00', bold: true }
          ]
        ]
      }
    }

    const result = getProgressiveReductionTable(delinkedStatement)
    expect(result).toEqual(expectedTable)
    expect(result.layout.hLineStyle()).toBe('solid')
    expect(result.layout.vLineStyle()).toBe('solid')
  })

  //
  // ─── FormatPaymentBand ────────────────────────────────────────────────
  //
  describe('formatPaymentBand', () => {
    test.each([
      [150000, 'BAND_50000_TO_150000', '£50,000.01 to £150,000'],
      [200000, 'BAND_ABOVE_150000', 'Above £150,000'],
      [1000, 'UNKNOWN_BAND', 'Up to £1,000']
    ])('should format %p with band %s correctly', (value, band, expected) => {
      expect(formatPaymentBand(value, band)).toBe(expected)
    })

    test.each([NaN, -100, -30000])(
      'should throw an error for invalid payment band value %p',
      (invalidValue) => {
        expect(() => formatPaymentBand(invalidValue, 'BAND_UP_TO_30000')).toThrow(
          `Invalid payment band value: ${invalidValue}`
        )
      }
    )
  })

  //
  // ─── FormatProgressiveReduction ──────────────────────────────────────
  //
  describe('formatProgressiveReduction', () => {
    test.each([
      ['1234.56', '£1,234.56'],
      ['0', '£0.00'],
      ['-500', '£-500.00']
    ])('should format %p correctly as %p', (input, expected) => {
      expect(formatProgressiveReduction(input)).toBe(expected)
    })

    test('should handle NaN gracefully', () => {
      const result = formatProgressiveReduction('abc')
      expect(result).toBe('£NaN')
    })
  })

  //
  // ─── FormatPercentage ────────────────────────────────────────────────
  //
  describe('formatPercentage', () => {
    test.each([
      [25, '25%'],
      [0, '0%'],
      [-50, '-50%']
    ])('should format %p as %p', (input, expected) => {
      expect(formatPercentage(input)).toBe(expected)
    })

    test.each([101, -101, 'not-a-number', NaN])(
      'should throw an error for invalid percentage value %p',
      (invalid) => {
        expect(() => formatPercentage(invalid)).toThrow(`Invalid percentage value: ${invalid}`)
      }
    )
  })

  //
  // ─── Error and edge cases in getProgressiveReductionTable ────────────
  //
  test('should throw an error for invalid percentage value inside table', () => {
    const delinkedStatement = {
      paymentBand1: 30000,
      percentageReduction1: 105,
      progressiveReductions1: 1500,
      paymentBand2: 50000,
      percentageReduction2: 55,
      progressiveReductions2: 5000,
      paymentBand3: 150000,
      percentageReduction3: 65,
      progressiveReductions3: 22500,
      paymentBand4: 200000,
      percentageReduction4: 70,
      progressiveReductions4: 40000,
      totalProgressiveReduction: 69000
    }

    expect(() => getProgressiveReductionTable(delinkedStatement)).toThrow('Invalid percentage value: 105')
  })

  test('should filter out zero progressive reduction values', () => {
    const delinkedStatement = {
      paymentBand1: 30000,
      percentageReduction1: 0,
      progressiveReductions1: 0,
      paymentBand2: 50000,
      percentageReduction2: -10,
      progressiveReductions2: -5000,
      paymentBand3: 150000,
      percentageReduction3: 65,
      progressiveReductions3: 22500,
      paymentBand4: 200000,
      percentageReduction4: 70,
      progressiveReductions4: 40000,
      totalProgressiveReduction: 17500
    }

    const result = getProgressiveReductionTable(delinkedStatement)
    const body = result.table.body

    expect(body.some(row => row[1]?.text === '0%')).toBe(false)
    expect(body.find(r => r[2]?.text === '£-5,000.00')).toBeTruthy()
  })

  test('should show only non-zero reduction bands', () => {
    const delinkedStatement = {
      paymentBand1: 30000,
      percentageReduction1: 0,
      progressiveReductions1: 0,
      paymentBand2: 50000,
      percentageReduction2: 0,
      progressiveReductions2: 0,
      paymentBand3: 150000,
      percentageReduction3: 65,
      progressiveReductions3: 22500,
      paymentBand4: 200000,
      percentageReduction4: 70,
      progressiveReductions4: 40000,
      totalProgressiveReduction: 22500
    }

    const result = getProgressiveReductionTable(delinkedStatement)
    const bands = result.table.body.slice(2).map(row => row[0].text)
    expect(bands).toContain('£50,000.01 to £150,000')
    expect(bands).toContain('Above £150,000')
  })

  test('should hide total row when totalProgressiveReduction is zero', () => {
    const delinkedStatement = {
      paymentBand1: 30000,
      percentageReduction1: 5,
      progressiveReductions1: 1500,
      paymentBand2: 50000,
      percentageReduction2: 10,
      progressiveReductions2: 2000,
      paymentBand3: 150000,
      percentageReduction3: -20,
      progressiveReductions3: -3500,
      paymentBand4: 200000,
      percentageReduction4: 70,
      progressiveReductions4: 40000,
      totalProgressiveReduction: 0
    }

    const result = getProgressiveReductionTable(delinkedStatement)
    expect(result.table.body.length).toBe(6) // 2 headers + 4 bands, no total
  })

  //
  // ─── Edge cases with specific visible bands ──────────────────────────
  //
  test('should test edge case with only band 4 showing', () => {
    const delinkedStatement = {
      paymentBand1: 30000,
      percentageReduction1: 5,
      progressiveReductions1: 0,
      paymentBand2: 50000,
      percentageReduction2: 10,
      progressiveReductions2: 0,
      paymentBand3: 150000,
      percentageReduction3: 15,
      progressiveReductions3: 0,
      paymentBand4: 200000,
      percentageReduction4: 20,
      progressiveReductions4: 10000,
      totalProgressiveReduction: 10000
    }

    const result = getProgressiveReductionTable(delinkedStatement)
    expect(result.table.body.length).toBe(4)
    expect(result.table.body[2][0].text).toBe('Above £150,000')
  })

  test('should test edge case with only band 3 showing', () => {
    const delinkedStatement = {
      paymentBand1: 30000,
      percentageReduction1: 5,
      progressiveReductions1: 0,
      paymentBand2: 50000,
      percentageReduction2: 10,
      progressiveReductions2: 0,
      paymentBand3: 150000,
      percentageReduction3: 15,
      progressiveReductions3: 15000,
      paymentBand4: 200000,
      percentageReduction4: 20,
      progressiveReductions4: 0,
      totalProgressiveReduction: 15000
    }

    const result = getProgressiveReductionTable(delinkedStatement)
    expect(result.table.body.length).toBe(4)
    expect(result.table.body[2][0].text).toBe('£50,000.01 to £150,000')
  })
})
