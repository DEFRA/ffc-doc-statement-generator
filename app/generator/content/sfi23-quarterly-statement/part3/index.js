const { getTable } = require('./get-payment-periods-table') // placeholder for the table structure, change to Abi file

const part3 = (sfi23Statement) => {
  return {
    stack: [
      { text: 'Payment Statement Table Placeholder', style: 'header3' },
      getTable(sfi23Statement.sfi23Statement) // placeholder for the table structure
    ],
    unbreakable: true
  }
}

module.exports = part3
