const moment = require('moment')

const delinkedIntroduction = (delinkedStatement) => {
  moment.locale('en-gb')
  return {
    stack: [
      { text: `Delinked payments ${delinkedStatement.scheme.year}: payment statement `, style: 'header2' },
      { text: 'Delinked payments have replaced Basic Payment Scheme (BPS) payments in England.' },
      '\n',
      { text: 'This statement explains the latest payment of your annual delinked payment, including your reference amount and progressive reduction.' }
    ],
    unbreakable: true
  }
}

module.exports = delinkedIntroduction
