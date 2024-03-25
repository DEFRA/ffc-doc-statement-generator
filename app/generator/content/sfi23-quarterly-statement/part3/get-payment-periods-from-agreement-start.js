const moment = require('moment')

const getPaymentPeriodsFromAgreementStart = (agreementStart, agreementEnd) => {
  moment.locale('en-gb')
  const monthDiff = moment(agreementEnd).diff(agreementStart, "month");
  const paymentPeriods = []

  for (let quarter = 0; quarter < monthDiff/3; quarter++) {
     month = quarter * 3
     const periodStart = moment(agreementStart).add(month, 'months').startOf('month')
     const periodEnd = moment(periodStart).add(3, 'months').subtract(1, 'day').endOf('month')
     const payDue = moment(periodStart).add(3, 'months')
     paymentPeriods.push({ quarter, periodStart, periodEnd, payDue})
  }

  return paymentPeriods
  }
  
  module.exports = getPaymentPeriodsFromAgreementStart