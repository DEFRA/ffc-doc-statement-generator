const moment = require('moment')
const SETTLEMENT_DATE_FORMAT = 'DD MMMM YYYY'

const getLatestPayment = (payments) => {
  const validPayments = payments.filter(x => moment(x.settled, SETTLEMENT_DATE_FORMAT).isValid())
  if (validPayments.length === 0) {
    return payments[payments.length - 1]
  }
  return getLatestFromValid(validPayments)
}

const getLatestFromValid = (payments) => {
  return payments.reduce((x, y) => {
    const currentDate = moment(x.settled, SETTLEMENT_DATE_FORMAT)
    const previousDate = moment(y.settled, SETTLEMENT_DATE_FORMAT)
    return currentDate && currentDate.isAfter(previousDate) ? x : y
  })
}

module.exports = getLatestPayment
