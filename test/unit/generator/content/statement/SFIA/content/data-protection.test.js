const dataProtection = require('../../../../../../../app/generator/content/data-protection')

describe('dataProtection', () => {
  test('should return the correct data protection object', () => {
    const result = dataProtection()

    expect(result).toHaveProperty('style', 'govuk-body-s')
    expect(result).toHaveProperty('stack')
    expect(result.stack[0]).toHaveProperty('text', 'Data Protection')
    expect(result.stack[1]).toHaveProperty('text', 'For information on how we handle personal data go to GOV.UK and search for')
    expect(result.stack[2]).toHaveProperty('text', '\'Rural Payments Agency personal information charter.\'')
    expect(result.stack[2]).toHaveProperty('link', 'https://www.gov.uk/claim-rural-payments')
    expect(result.stack[2]).toHaveProperty('decoration', 'underline')
    expect(result.stack[4]).toHaveProperty('text', 'About this email')
    expect(result.stack[5]).toBe('This email has been sent to you because the email address has been provided to us. If you no longer wish to be contacted electronically, please let us know. If you have done this recently please allow for this to take effect.')
    expect(result.stack[7]).toHaveProperty('text', 'Security')
    expect(result.stack[8]).toBe('Please be on your guard against emails that request any of your security details. We will never ask you by email to enter (or record) these details. If you receive an email like this, you should not respond.')
    expect(result.stack[10]).toHaveProperty('text', 'Legal')
    expect(result.stack[11]).toBe('This email message is confidential and for use by the addressee only. If the message is received by anyone other than the addressee, please delete it from your computer.')
    expect(result.stack[13]).toHaveProperty('text', 'The Rural Payments Agency does not accept responsibility for changes made to this message after it was sent.')
    expect(result.stack[15]).toBe('While all reasonable care has been taken to avoid the transmission of viruses, it is your responsibility to ensure that onward transmission, opening or use of this message and any attachments will not adversely affect your systems or data. No responsibility is accepted by the Rural Payments Agency in this regard and you should carry out appropriate virus and other checks.')
  })
})
