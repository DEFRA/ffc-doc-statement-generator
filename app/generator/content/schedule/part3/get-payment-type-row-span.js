const { IMMEDIATE } = require('../../../../../app/constants/payment-types')

const getPaymentTypeRowSpan = (paymentType, rowsCount, order) => {
  return paymentType === IMMEDIATE ? 1 : rowsCount - Number(order)
}

module.exports = getPaymentTypeRowSpan
