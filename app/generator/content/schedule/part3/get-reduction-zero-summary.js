const toCurrencyString = require('../../../to-currency-string')

const getReductionZeroSummary = (schedule) => {
  const adjustment = schedule.adjustment
  return {
    stack: [
      'The table below shows your revised quarterly payments.\n\n',
      {
        layout: {
          hLineStyle: () => 'solid',
          vLineStyle: () => 'solid'
        },
        table: {
          widths: ['*'],
          body: [
            [{
              stack: [
                `Current agreement value: ${toCurrencyString(adjustment.currentValue)}\n`,
                `Reduction: ${toCurrencyString(String(Math.abs(adjustment.adjustmentValue)))}\n`,
                `New agreement value: ${toCurrencyString(adjustment.newValue)}\n`,
                `Total payments recived: ${toCurrencyString(adjustment.newValue)}\n`,
                `Remaining balance: ${toCurrencyString(String(Math.abs(schedule.remainingAmount)))}`
              ]
            }]
          ]
        }
      }
    ]
  }
}

module.exports = getReductionZeroSummary
