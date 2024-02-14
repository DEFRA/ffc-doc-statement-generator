const getPaymentPeriod = (paymentPeriod) => {
  return {
    columns: [
      { width: 200, text: 'Payment period:' },
      { width: '*', text: paymentPeriod }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getPaymentPeriod
