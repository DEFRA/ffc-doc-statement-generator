const moment = require('moment')

const getPeriodStartDateFromPeriod = (period) => {
  moment.locale('en-gb')
  const numParts = period.split('to')
  return moment(numParts[0], 'Do MMMM YYYY').toDate()
}
  
  module.exports = getPeriodStartDateFromPeriod
  