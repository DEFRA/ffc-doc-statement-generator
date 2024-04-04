const moment = require('moment')

const getPaymentPeriodsFromPaymentPeriodStart = (paymentPeriodStart, agreementEnd) => {
  moment.locale('en-gb')
  const monthDiff = moment(agreementEnd).diff(paymentPeriodStart, "month")
  const noOfMonthsInpaymentYear = 12
  const remainingPaymentYearMonths = monthDiff%noOfMonthsInpaymentYear
  const paymentPeriods = []

  for (let quarter = 1; quarter < remainingPaymentYearMonths/3; quarter++) {
     month = quarter * 3
     const periodStart = moment(paymentPeriodStart).add(month, 'months').startOf('month')
     const periodEnd = moment(periodStart).add(3, 'months').subtract(1, 'day').endOf('month')
     const payDue = moment(periodStart).add(3, 'months')
     paymentPeriods.push({ quarter, periodStart, periodEnd, payDue})
  }

  return paymentPeriods
  }
  
  module.exports = getPaymentPeriodsFromPaymentPeriodStart