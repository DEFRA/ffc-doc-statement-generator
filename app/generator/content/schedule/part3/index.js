const { getTable } = require('./get-table')
const getSummary = require('./get-summary')

const part3 = (schedule) => {
  return {
    stack: [
      { text: 'Payment schedule', style: 'header3' },
      getSummary(schedule),
      getTable(schedule.schedule)
    ],
    unbreakable: true
  }
}

module.exports = part3
