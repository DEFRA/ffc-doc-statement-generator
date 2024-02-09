const getReductionSummary = require('./get-reduction-summary')
const getTopUpSummary = require('./get-top-up-summary')
const getReductionZeroSummary = require('./get-reduction-zero-summary')
const getRecoverySummary = require('./get-recovery-summary')

const getSummary = (schedule) => {
  const remainingAmount = schedule.remainingAmount
  switch (true) {
    case (remainingAmount > 0):
      return schedule.adjustment.adjustmentValue > 0 ? getTopUpSummary(schedule.adjustment) : getReductionSummary(schedule)
    case (remainingAmount === 0):
      return getReductionZeroSummary(schedule)
    case (remainingAmount < 0):
      return getRecoverySummary(schedule)
  }
}

module.exports = getSummary
