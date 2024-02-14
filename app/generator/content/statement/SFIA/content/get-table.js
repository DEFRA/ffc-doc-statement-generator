const toCurrencyString = require('../../../../to-currency-string')

const part2 = (latestPayment) => {
  return {
    stack: [
      { text: 'As you have a SFI 2023 agreement starting before the end of the calendar year, you are receiving an early payment worth 25% of the value of your annual agreement.' },
      '\n',
      { text: ' Payment summary', bold: true },
      '\n',
      { text: `Your SFI agreement and management payment is ${toCurrencyString(latestPayment.value)}`, bold: true },
      '\n',
      { text: 'Payment period: 1 October to 31 December 2023' },
      '\n',
      { text: 'Payments are usually made within 2 working days of this statement.' }
    ]
  }
}

module.exports = part2
