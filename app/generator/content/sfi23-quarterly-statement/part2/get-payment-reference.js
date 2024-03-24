const getPaymentReference = (paymentReference) => {
  return {
    columns: [
      { width: 200, text: 'Payment reference: ' },
      { width: '*', text: paymentReference }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getPaymentReference
