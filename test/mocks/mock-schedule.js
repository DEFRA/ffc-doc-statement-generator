const address = require('../mocks/components/address')
const businessName = require('../mocks/components/business-name')
const documentReference = require('../mocks/components/document-reference')
const { topUpRemainingAmount, reductionRemainingAmount, reductionZeroRemainingAmount, recoveryRemainingAmount } = require('../mocks/components/remaining-amount')
const { topUpAdjustment, reductionAdjustment } = require('../mocks/objects/adjustment')
const { topUpScheduleTimeline, reductionScheduleTimeline, reductionZeroScheduleTimeline, recoveryScheduleTimeline } = require('../mocks/objects/schedule-timelines')

const baseSchedule = {
  businessName,
  sbi: 123456789,
  frn: 1234567890,
  email: 'farmer@farms.com',
  documentReference,
  address,
  scheme: {
    name: 'Sustainable Farming Incentive',
    shortName: 'SFI',
    year: '2022',
    frequency: 'Quarterly',
    agreementNumber: 'SFI1234567'
  }
}

const topUpSchedule = {
  ...baseSchedule,
  remainingAmount: topUpRemainingAmount,
  schedule: topUpScheduleTimeline,
  adjustment: topUpAdjustment
}

const reductionSchedule = {
  ...baseSchedule,
  remainingAmount: reductionRemainingAmount,
  schedule: reductionScheduleTimeline,
  adjustment: reductionAdjustment
}

const reductionZeroSchedule = {
  ...baseSchedule,
  remainingAmount: reductionZeroRemainingAmount,
  schedule: reductionZeroScheduleTimeline,
  adjustment: reductionAdjustment
}

const recoverySchedule = {
  ...baseSchedule,
  remainingAmount: recoveryRemainingAmount,
  schedule: recoveryScheduleTimeline,
  adjustment: reductionAdjustment
}

module.exports = {
  topUpSchedule,
  reductionSchedule,
  reductionZeroSchedule,
  recoverySchedule
}
