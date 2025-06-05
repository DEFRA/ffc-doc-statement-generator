const MESSAGE_SOURCE = require('../../constants/message-source')

const mapPublish = (document, filename, type) => {
  const body = {
    businessName: document.businessName,
    sbi: document.sbi,
    frn: document.frn,
    address: document.address,
    email: document.email,
    filename,
    scheme: document.scheme,
    documentReference: document?.documentReference ?? null
  }

  if (document.paymentPeriod) {
    body.paymentPeriod = document.paymentPeriod
  }

  if (type === 'delinked-statement') {
    body.paymentBand1 = document.paymentBand1
    body.paymentBand2 = document.paymentBand2
    body.paymentBand3 = document.paymentBand3
    body.paymentBand4 = document.paymentBand4
    body.percentageReduction1 = document.percentageReduction1
    body.percentageReduction2 = document.percentageReduction2
    body.percentageReduction3 = document.percentageReduction3
    body.percentageReduction4 = document.percentageReduction4
    body.progressiveReductions1 = document.progressiveReductions1
    body.progressiveReductions2 = document.progressiveReductions2
    body.progressiveReductions3 = document.progressiveReductions3
    body.progressiveReductions4 = document.progressiveReductions4
    body.referenceAmount = document.referenceAmount
    body.totalProgressiveReduction = document.totalProgressiveReduction
    body.totalDelinkedPayment = document.totalDelinkedPayment
    body.paymentAmountCalculated = document.paymentAmountCalculated
    body.transactionDate = document.transactionDate
  }

  const result = {
    body,
    type: `uk.gov.doc.${type}.publish`,
    source: MESSAGE_SOURCE
  }
  return result
}

module.exports = mapPublish
