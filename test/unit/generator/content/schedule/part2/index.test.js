jest.mock('../../../../../../app/generator/content/schedule/part2/get-top-up-description')
const getTopUpDescription = require('../../../../../../app/generator/content/schedule/part2/get-top-up-description')

jest.mock('../../../../../../app/generator/content/schedule/part2/get-reduction-description')
const getReductionDescription = require('../../../../../../app/generator/content/schedule/part2/get-reduction-description')

jest.mock('../../../../../../app/generator/content/schedule/part2/get-reduction-zero-description')
const getReductionZeroDescription = require('../../../../../../app/generator/content/schedule/part2/get-reduction-zero-description')

jest.mock('../../../../../../app/generator/content/schedule/part2/get-recovery-description')
const getRecoveryDescription = require('../../../../../../app/generator/content/schedule/part2/get-recovery-description')

const part2 = require('../../../../../../app/generator/content/schedule/part2')

const { topUpSchedule, reductionSchedule, reductionZeroSchedule, recoverySchedule } = require('../../../../../mocks/mock-schedule')

describe('schedule part 2', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('top-up description', () => {
    test('Ensure getTopUpDescription is called', () => {
      part2(topUpSchedule)
      expect(getTopUpDescription).toHaveBeenCalled()
    })

    test('Ensure getTopUpDescription is called once', () => {
      part2(topUpSchedule)
      expect(getTopUpDescription).toHaveBeenCalledTimes(1)
    })

    test('Ensure getTopUpDescription is called with topUpSchedule', () => {
      part2(topUpSchedule)
      expect(getTopUpDescription).toHaveBeenCalledWith(topUpSchedule)
    })

    test('Ensure getReductionDescription is not called', () => {
      part2(topUpSchedule)
      expect(getReductionDescription).not.toHaveBeenCalled()
    })

    test('Ensure getReductionZeroDescription is not called', () => {
      part2(topUpSchedule)
      expect(getReductionZeroDescription).not.toHaveBeenCalled()
    })

    test('Ensure getRecoveryDescription is not called', () => {
      part2(topUpSchedule)
      expect(getRecoveryDescription).not.toHaveBeenCalled()
    })
  })

  describe('reduction description', () => {
    test('Ensure getReductionDescription is called', () => {
      part2(reductionSchedule)
      expect(getReductionDescription).toHaveBeenCalled()
    })

    test('Ensure getReductionDescription is called once', () => {
      part2(reductionSchedule)
      expect(getReductionDescription).toHaveBeenCalledTimes(1)
    })

    test('Ensure getReductionDescription is called with reductionSchedule', () => {
      part2(reductionSchedule)
      expect(getReductionDescription).toHaveBeenCalledWith(reductionSchedule)
    })

    test('Ensure getTopUpDescription is not called', () => {
      part2(reductionSchedule)
      expect(getTopUpDescription).not.toHaveBeenCalled()
    })

    test('Ensure getReductionZeroDescription is not called', () => {
      part2(reductionSchedule)
      expect(getReductionZeroDescription).not.toHaveBeenCalled()
    })

    test('Ensure getRecoveryDescription is not called', () => {
      part2(reductionSchedule)
      expect(getRecoveryDescription).not.toHaveBeenCalled()
    })
  })

  describe('reduction Zero description', () => {
    test('Ensure getReductionZeroDescription is called', () => {
      part2(reductionZeroSchedule)
      expect(getReductionZeroDescription).toHaveBeenCalled()
    })

    test('Ensure getReductionZeroDescription is called once', () => {
      part2(reductionZeroSchedule)
      expect(getReductionZeroDescription).toHaveBeenCalledTimes(1)
    })

    test('Ensure getReductionZeroDescription is called with reductionZeroSchedule', () => {
      part2(reductionZeroSchedule)
      expect(getReductionZeroDescription).toHaveBeenCalledWith(reductionZeroSchedule)
    })

    test('Ensure getTopUpDescription is not called', () => {
      part2(reductionZeroSchedule)
      expect(getTopUpDescription).not.toHaveBeenCalled()
    })

    test('Ensure getReductionDescription is not called', () => {
      part2(reductionZeroSchedule)
      expect(getReductionDescription).not.toHaveBeenCalled()
    })

    test('Ensure getRecoveryDescription is not called', () => {
      part2(reductionZeroSchedule)
      expect(getRecoveryDescription).not.toHaveBeenCalled()
    })
  })

  describe('recovery description', () => {
    test('Ensure getRecoveryDescription is called', () => {
      part2(recoverySchedule)
      expect(getRecoveryDescription).toHaveBeenCalled()
    })

    test('Ensure getRecoveryDescription is called once', () => {
      part2(recoverySchedule)
      expect(getRecoveryDescription).toHaveBeenCalledTimes(1)
    })

    test('Ensure getRecoveryDescription is called with recoverySchedule', () => {
      part2(recoverySchedule)
      expect(getRecoveryDescription).toHaveBeenCalledWith(recoverySchedule)
    })

    test('Ensure getTopUpDescription is not called', () => {
      part2(recoverySchedule)
      expect(getTopUpDescription).not.toHaveBeenCalled()
    })

    test('Ensure getReductionDescription is not called', () => {
      part2(recoverySchedule)
      expect(getReductionDescription).not.toHaveBeenCalled()
    })

    test('Ensure getReductionZeroDescription is not called', () => {
      part2(recoverySchedule)
      expect(getReductionZeroDescription).not.toHaveBeenCalled()
    })
  })
})
