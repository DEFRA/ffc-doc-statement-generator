const MESSAGE_SOURCE = require('../../constants/message-source')

const mapPublish = (document, filename, type) => {
  return {
    body: {
      businessName: document.businessName,
      sbi: document.sbi,
      frn: document.frn,
      address: document.address,
      email: document.email,
      filename,
      scheme: document.scheme,
      documentReference: document?.documentReference ?? null,
      paymentPeriod: document?.paymentPeriod ?? ''
    },
    type: `uk.gov.doc.${type}.publish`,
    source: MESSAGE_SOURCE
  }
}

module.exports = mapPublish
