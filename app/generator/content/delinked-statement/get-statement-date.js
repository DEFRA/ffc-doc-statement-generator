const getStatementDate = (transactionDate) => {
  return {
    columns: [
      { width: 200, text: 'Statement date:' },
      { width: '*', text: transactionDate }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getStatementDate
