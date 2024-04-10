const moment = require('moment')
const number3 = 3
const number2 = 2

const getPaymentPeriodsFromPaymentPeriodStart = (paymentPeriodStart, agreementEnd) => {
  moment.locale('en-gb')
  const monthDiff = moment(agreementEnd).diff(paymentPeriodStart, 'month')
  const remainingPaymentYearMonths = monthDiff
  const paymentPeriods = []

  let startQuarter = 1
  if (remainingPaymentYearMonths / number3 > number3) {
    startQuarter = (remainingPaymentYearMonths / number3) - number2
  }

  for (let quarter = startQuarter; quarter <= remainingPaymentYearMonths / number3; quarter++) {
    const month = quarter * number3
    const periodStart = moment(paymentPeriodStart).add(month, 'months').startOf('month')
    const periodEnd = moment(periodStart).add(number3, 'months').subtract(1, 'day').endOf('month')
    const payDue = moment(periodStart).add(number3, 'months')
    paymentPeriods.push({ quarter, periodStart, periodEnd, payDue })
  }

  return paymentPeriods
}

module.exports = getPaymentPeriodsFromPaymentPeriodStart
