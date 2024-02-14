const toCurrencyString = require('../../../../../generator/to-currency-string')
const getCalculationDate = require('./get-calculation-date')
const getPaymentPeriod = require('./get-payment-period')
const getReference = require('./get-reference')

const getTable = (scheme, latestPayment) => {
  return {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    table: {
      widths: ['*'],
      body: [
        [{
          stack: [
            { text: `Your payment for your ${scheme.shortName} agreement is ${toCurrencyString(latestPayment.value)}`, bold: true },
            `\nWe will usually pay this into your account within 2 working days of ${latestPayment.settled}.\n\n`,
            getPaymentPeriod(latestPayment.period),
            getCalculationDate(latestPayment.calculated),
            getReference(latestPayment.reference)
          ]
        }]
      ]
    }
  }
}

module.exports = getTable
