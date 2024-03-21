const { getTable } = require('./get-payment-periods')

const part3 = (sfi23Statement) => {
  return {
    stack: [
      { text: 'Payment Statement Placeholder', style: 'header3' },
      getTable(sfi23Statement.sfi23Statement) // placeholder for the table structure
    ],
    unbreakable: true
  }
}

module.exports = part3
