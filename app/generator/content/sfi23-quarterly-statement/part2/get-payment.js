const getPayment = (paymentAmount) => {
  return {
    columns: [
      { width: 200, text: 'Payment: ' },
      { width: '*', text: paymentAmount }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getPayment
