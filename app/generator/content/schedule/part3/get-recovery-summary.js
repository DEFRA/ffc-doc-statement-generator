const toCurrencyString = require('../../../to-currency-string')

const getRecoverySummary = (schedule) => {
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
                `Total payments received: ${toCurrencyString(String(adjustment.newValue - schedule.remainingAmount))}\n`,
                `Recovery payment due: ${toCurrencyString(String(Math.abs(schedule.remainingAmount)))}`,
                `\nAn invoice for ${toCurrencyString(String(Math.abs(schedule.remainingAmount)))} is included with this email`
              ]
            }]
          ]
        }
      }
    ]
  }
}

module.exports = getRecoverySummary
