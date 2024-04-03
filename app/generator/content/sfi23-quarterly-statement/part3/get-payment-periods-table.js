const moment = require('moment')

const getPaymentPeriodsFromPaymentPeriodStart = require('./get-payment-periods-from-payment-period-start')

const getPaymentPeriodsTable = (paymentPeriodStart, agreementEnd) => {
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
          { text: 'Estimated payment', style: 'tableHeader' }
        ]
      ]
    },

  }

  const paymentPeriods = getPaymentPeriodsFromPaymentPeriodStart(paymentPeriodStart, agreementEnd)
  for( const paymentPeriod of paymentPeriods) {
  
    const estimatedPayment = moment(paymentPeriod.payDue).format('MMMM YYYY')
    paymentPeriodTable.table.body.push([
      { text: `${moment(paymentPeriod.periodStart).format('LL')} to ${moment(paymentPeriod.periodEnd).format('LL')}` },
      { text: estimatedPayment }
    ])

  }
  return paymentPeriodTable
}

module.exports = getPaymentPeriodsTable

