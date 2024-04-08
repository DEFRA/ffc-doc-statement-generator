const moment = require('moment')

const getPaymentPeriodsFromPaymentPeriodStart = (paymentPeriodStart, agreementEnd) => {
  moment.locale('en-gb')
  const monthDiff = moment(agreementEnd).diff(paymentPeriodStart, 'month')
  const remainingPaymentYearMonths = monthDiff
  const paymentPeriods = []

  let startQuarter = 1
  if (remainingPaymentYearMonths / 3 > 3) {
    startQuarter = (remainingPaymentYearMonths / 3) - 2
  }

  for (let quarter = startQuarter; quarter <= remainingPaymentYearMonths / 3; quarter++) {
    const month = quarter * 3
    const periodStart = moment(paymentPeriodStart).add(month, 'months').startOf('month')
    const periodEnd = moment(periodStart).add(3, 'months').subtract(1, 'day').endOf('month')
    const payDue = moment(periodStart).add(3, 'months')
    paymentPeriods.push({ quarter, periodStart, periodEnd, payDue })
  }

  return paymentPeriods
}

module.exports = getPaymentPeriodsFromPaymentPeriodStart
