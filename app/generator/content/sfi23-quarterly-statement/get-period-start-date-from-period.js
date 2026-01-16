const moment = require('moment')

const getPeriodStartDateFromPeriod = (period) => {
  const numParts = period.split('to')
  let startPart = numParts[0] || ''
  startPart = startPart.trim()

  // If the start part doesn't contain a year, use the year from the end part when present
  if (!/\b\d{4}\b/.test(startPart) && numParts[1]) {
    const endPart = numParts[1]
    const yearMatch = endPart.match(/\b(\d{4})\b/)
    if (yearMatch) {
      startPart = `${startPart} ${yearMatch[1]}`
    }
  }

  return moment(startPart, 'D MMMM YYYY').toDate()
}

module.exports = getPeriodStartDateFromPeriod
