const getPaymentPeriod = (paymentPeriod) => {
  return {
    columns: [
      { width: 200, text: 'Period: ' },
      { width: '*', text: paymentPeriod }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getPaymentPeriod
