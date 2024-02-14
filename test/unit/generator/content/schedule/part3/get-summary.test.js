jest.mock('../../../../../../app/generator/content/schedule/part3/get-top-up-summary')
const getTopUpSummary = require('../../../../../../app/generator/content/schedule/part3/get-top-up-summary')

jest.mock('../../../../../../app/generator/content/schedule/part3/get-reduction-summary')
const getReductionSummary = require('../../../../../../app/generator/content/schedule/part3/get-reduction-summary')

jest.mock('../../../../../../app/generator/content/schedule/part3/get-reduction-zero-summary')
const getReductionZeroSummary = require('../../../../../../app/generator/content/schedule/part3/get-reduction-zero-summary')

jest.mock('../../../../../../app/generator/content/schedule/part3/get-recovery-summary')
const getRecoverySummary = require('../../../../../../app/generator/content/schedule/part3/get-recovery-summary')

const getSummary = require('../../../../../../app/generator/content/schedule/part3/get-summary')

const { topUpSchedule, reductionSchedule, reductionZeroSchedule, recoverySchedule } = require('../../../../../mocks/mock-schedule')

describe('get summary', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('top-up summary', () => {
    test('Ensure getTopUpSummary is called', () => {
      getSummary(topUpSchedule)
      expect(getTopUpSummary).toHaveBeenCalled()
    })

    test('Ensure getTopUpSummary is called once', () => {
      getSummary(topUpSchedule)
      expect(getTopUpSummary).toHaveBeenCalledTimes(1)
    })

    test('Ensure getTopUpSummary is called with topUpSchedule.adjustment', () => {
      getSummary(topUpSchedule)
      expect(getTopUpSummary).toHaveBeenCalledWith(topUpSchedule.adjustment)
    })

    test('Ensure getReductionSummary is not called', () => {
      getSummary(topUpSchedule)
      expect(getReductionSummary).not.toHaveBeenCalled()
    })

    test('Ensure getReductionZeroSummary is not called', () => {
      getSummary(topUpSchedule)
      expect(getReductionZeroSummary).not.toHaveBeenCalled()
    })

    test('Ensure getRecoverySummary is not called', () => {
      getSummary(reductionSchedule)
      expect(getRecoverySummary).not.toHaveBeenCalled()
    })
  })

  describe('reduction summary', () => {
    test('Ensure getReductionSummary is called', () => {
      getSummary(reductionSchedule)
      expect(getReductionSummary).toHaveBeenCalled()
    })

    test('Ensure getReductionSummary is called once', () => {
      getSummary(reductionSchedule)
      expect(getReductionSummary).toHaveBeenCalledTimes(1)
    })

    test('Ensure getReductionSummary is called with reductionSchedule', () => {
      getSummary(reductionSchedule)
      expect(getReductionSummary).toHaveBeenCalledWith(reductionSchedule)
    })

    test('Ensure getTopUpSummary is not called', () => {
      getSummary(reductionSchedule)
      expect(getTopUpSummary).not.toHaveBeenCalled()
    })

    test('Ensure getReductionZeroSummary is not called', () => {
      getSummary(reductionSchedule)
      expect(getReductionZeroSummary).not.toHaveBeenCalled()
    })

    test('Ensure getRecoverySummary is not called', () => {
      getSummary(reductionSchedule)
      expect(getRecoverySummary).not.toHaveBeenCalled()
    })
  })

  describe('reduction Zero summary', () => {
    test('Ensure getReductionZeroSummary is called', () => {
      getSummary(reductionZeroSchedule)
      expect(getReductionZeroSummary).toHaveBeenCalled()
    })

    test('Ensure getReductionZeroSummary is called once', () => {
      getSummary(reductionZeroSchedule)
      expect(getReductionZeroSummary).toHaveBeenCalledTimes(1)
    })

    test('Ensure getReductionZeroSummary is called with reductionZeroSchedule', () => {
      getSummary(reductionZeroSchedule)
      expect(getReductionZeroSummary).toHaveBeenCalledWith(reductionZeroSchedule)
    })

    test('Ensure getTopUpSummary is not called', () => {
      getSummary(reductionZeroSchedule)
      expect(getTopUpSummary).not.toHaveBeenCalled()
    })

    test('Ensure getReductionSummary is not called', () => {
      getSummary(reductionZeroSchedule)
      expect(getReductionSummary).not.toHaveBeenCalled()
    })

    test('Ensure getRecoverySummary is not called', () => {
      getSummary(reductionZeroSchedule)
      expect(getRecoverySummary).not.toHaveBeenCalled()
    })
  })

  describe('recovery summary', () => {
    test('Ensure getRecoverySummary is called', () => {
      getSummary(recoverySchedule)
      expect(getRecoverySummary).toHaveBeenCalled()
    })

    test('Ensure getRecoverySummary is called once', () => {
      getSummary(recoverySchedule)
      expect(getRecoverySummary).toHaveBeenCalledTimes(1)
    })

    test('Ensure getRecoverySummary is called with recoverySchedule', () => {
      getSummary(recoverySchedule)
      expect(getRecoverySummary).toHaveBeenCalledWith(recoverySchedule)
    })

    test('Ensure getTopUpSummary is not called', () => {
      getSummary(recoverySchedule)
      expect(getTopUpSummary).not.toHaveBeenCalled()
    })

    test('Ensure getReductionSummary is not called', () => {
      getSummary(recoverySchedule)
      expect(getReductionSummary).not.toHaveBeenCalled()
    })

    test('Ensure getReductionZeroSummary is not called', () => {
      getSummary(recoverySchedule)
      expect(getReductionZeroSummary).not.toHaveBeenCalled()
    })
  })
})
