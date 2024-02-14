const getReference = (reference) => {
  return {
    columns: [
      { width: 200, text: 'Payment reference number:' },
      { width: '*', text: reference }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getReference
