const getLatestPayment = require('./get-latest-payment')
const getTable = require('./get-table')

const part2 = (statement) => {
  const latestPayment = getLatestPayment(statement.payments)
  return {
    stack: [
      { text: 'Sustainable Farming Incentive 2023 statement', style: 'SFIAHeader' },
      getTable(latestPayment)
    ],
    unbreakable: true
  }
}

module.exports = part2
