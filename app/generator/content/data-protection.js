const dataProtection = () => {
  return {
    style: 'govuk-body-s',
    stack: [
      { text: 'Data Protection', bold: true },
      { text: 'For information on how we handle personal data go to GOV.UK and search for' },
      { text: '\'Rural Payments Agency personal information charter.\'', link: 'https://www.gov.uk/claim-rural-payments', decoration: 'underline' },
      '\n',
      { text: 'About this email', bold: true },
      'This email has been sent to you because the email address has been provided to us. If you no longer wish to be contacted electronically, please let us know. If you have done this recently please allow for this to take effect.',
      '\n',
      { text: 'Security', bold: true },
      'Please be on your guard against emails that request any of your security details. We will never ask you by email to enter (or record) these details. If you receive an email like this, you should not respond.',
      '\n',
      { text: 'Legal', bold: true },
      'This email message is confidential and for use by the addressee only. If the message is received by anyone other than the addressee, please delete it from your computer.',
      '\n',
      { text: 'The Rural Payments Agency does not accept responsibility for changes made to this message after it was sent.' },
      '\n',
      'While all reasonable care has been taken to avoid the transmission of viruses, it is your responsibility to ensure that onward transmission, opening or use of this message and any attachments will not adversely affect your systems or data. No responsibility is accepted by the Rural Payments Agency in this regard and you should carry out appropriate virus and other checks.'
    ],
    unbreakable: true
  }
}

module.exports = dataProtection
