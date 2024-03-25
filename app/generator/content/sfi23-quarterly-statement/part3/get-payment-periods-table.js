const moment = require('moment')

const getPaymentPeriodsFromAgreementStart = require('./get-payment-periods-from-agreement-start')

const getPaymentPeriodsTable = (agreementStart, agreementEnd, previousPaymentCount) => {
  moment.locale('en-gb')
  const paymentPeriodTable = {
    layout: {
      hLineStyle: () => 'solid',
      vLineStyle: () => 'solid'
    },
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['*', '*'],
      body: [
        [
          { text: 'Period', style: 'tableHeader' },
          { text: 'Estimated Payment', style: 'tableHeader' }
        ]
      ]
    },

  }

  const paymentPeriods = getPaymentPeriodsFromAgreementStart(agreementStart, agreementEnd)
  for( const paymentPeriod of paymentPeriods) {
    if (paymentPeriod.quarter > previousPaymentCount) {
      const estimatedPayment = moment(paymentPeriod.payDue).format('MMMM YYYY')
      paymentPeriodTable.table.body.push([
        { text: `${moment(paymentPeriod.periodStart).format('LL')} to ${moment(paymentPeriod.periodEnd).format('LL')}` },
        { text: estimatedPayment }
      ])
    }
  }
  return paymentPeriodTable
}

module.exports = getPaymentPeriodsTable

