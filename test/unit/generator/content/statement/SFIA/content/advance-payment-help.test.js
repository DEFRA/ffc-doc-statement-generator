const advancePaymentHelp = require('../../../../../../../app/generator/content/advance-payment-help')

describe('advancedPaymentHelp', () => {
  test('should return the correct advanced payment help page', () => {
    const result = advancePaymentHelp()

    expect(result.style).toBe('govuk-body-s')
    expect(result).toHaveProperty('stack')
    expect(result.stack[0]).toBe('\n')
    expect(result.stack[1]).toHaveProperty('text', 'More information')
    expect(result.stack[2]).toHaveProperty('text', 'If you think your payments are wrong, you should:')
    expect(result.stack[3]).toHaveProperty('ul')
    expect(result.stack[3].ul[0].text[0]).toBe('log into the Rural Payments service ')
    expect(result.stack[3].ul[0].text[1]).toHaveProperty('text', 'www.gov.uk/claim-rural-payments')
    expect(result.stack[3].ul[0].text[1]).toHaveProperty('link', 'https://www.gov.uk/claim-rural-payments')
    expect(result.stack[3].ul[0].text[2]).toBe(' to check your SFI standard agreement')
    expect(result.stack[3].ul[1]).toBe('check statements and letters you\'ve received from us')
    expect(result.stack[3].ul[2].text[0]).toBe('review the SFI scheme information at ')
    expect(result.stack[3].ul[2].text[1]).toHaveProperty('text', 'www.gov.uk/government/collections/sustainable-farming-incentive-guidance')
    expect(result.stack[3].ul[2].text[1]).toHaveProperty('link', 'https://www.gov.uk/government/collections/sustainable-farming-incentive-guidance')
    expect(result.stack[5]).toHaveProperty('text', 'If you have any questions about this email')
    expect(result.stack[6].text[0]).toBe('You can email ')
    expect(result.stack[6].text[1]).toHaveProperty('text', 'ruralpayments@defra.gov.uk')
    expect(result.stack[6].text[1]).toHaveProperty('link', 'mailto:ruralpayments@defra.gov.uk')
    expect(result.stack[7].text[0]).toHaveProperty('text', 'Yours faithfully ')
    expect(result.stack[7].text[2]).toHaveProperty('text', 'Karen Brash')
    expect(result.stack[7].text[4]).toHaveProperty('text', 'Sustainable Farming Incentive Operational Delivery manager')
    expect(result.stack[7].text[6]).toHaveProperty('text', 'Rural Payments Agency | PO Box 325 | WORKSOP | S95 1DE\n')
    expect(result.stack[7].text[7]).toHaveProperty('text', 'ruralpayments@defra.gov.uk')
    expect(result.stack[7].text[9]).toHaveProperty('text', 'gov.uk/defra/sfi')
    expect(result.stack[7].text[10]).toHaveProperty('text', '\n Follow us on Twitter @Ruralpay')
  })
})
