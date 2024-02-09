jest.mock('../../../../../../app/generator/content/schedule/part3/get-table')
const { getTable } = require('../../../../../../app/generator/content/schedule/part3/get-table')

jest.mock('../../../../../../app/generator/content/schedule/part3/get-summary')
const getSummary = require('../../../../../../app/generator/content/schedule/part3/get-summary')

const part3 = require('../../../../../../app/generator/content/schedule/part3')
const { topUpSchedule, reductionSchedule, reductionZeroSchedule, recoverySchedule } = require('../../../../../mocks/mock-schedule')

describe('schedule part 3', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('top-up schedule part 3', () => {
    test('Ensure getTable is called', () => {
      part3(topUpSchedule)
      expect(getTable).toHaveBeenCalled()
    })

    test('Ensure getTable is called once', () => {
      part3(topUpSchedule)
      expect(getTable).toHaveBeenCalledTimes(1)
    })

    test('Ensure getTable is called with topUpSchedule.schedule', () => {
      part3(topUpSchedule)
      expect(getTable).toHaveBeenCalledWith(topUpSchedule.schedule)
    })

    test('Ensure getSummary is called', () => {
      part3(topUpSchedule)
      expect(getSummary).toHaveBeenCalled()
    })

    test('Ensure getSummary is called once', () => {
      part3(topUpSchedule)
      expect(getSummary).toHaveBeenCalledTimes(1)
    })

    test('Ensure getSummary is called with topUpSchedule', () => {
      part3(topUpSchedule)
      expect(getSummary).toHaveBeenCalledWith(topUpSchedule)
    })
  })

  describe('reduction schedule part 3', () => {
    test('Ensure getTable is called', () => {
      part3(reductionSchedule)
      expect(getTable).toHaveBeenCalled()
    })

    test('Ensure getTable is called once', () => {
      part3(reductionSchedule)
      expect(getTable).toHaveBeenCalledTimes(1)
    })

    test('Ensure getTable is called with reductionSchedule.schedule', () => {
      part3(reductionSchedule)
      expect(getTable).toHaveBeenCalledWith(reductionSchedule.schedule)
    })

    test('Ensure getSummary is called', () => {
      part3(reductionSchedule)
      expect(getSummary).toHaveBeenCalled()
    })

    test('Ensure getSummary is called once', () => {
      part3(reductionSchedule)
      expect(getSummary).toHaveBeenCalledTimes(1)
    })

    test('Ensure getSummary is called with reductionSchedule', () => {
      part3(reductionSchedule)
      expect(getSummary).toHaveBeenCalledWith(reductionSchedule)
    })
  })

  describe('reduction Zero schedule part 3', () => {
    test('Ensure getTable is called', () => {
      part3(reductionZeroSchedule)
      expect(getTable).toHaveBeenCalled()
    })

    test('Ensure getTable is called once', () => {
      part3(reductionZeroSchedule)
      expect(getTable).toHaveBeenCalledTimes(1)
    })

    test('Ensure getTable is called with reductionZeroSchedule.schedule', () => {
      part3(reductionZeroSchedule)
      expect(getTable).toHaveBeenCalledWith(reductionZeroSchedule.schedule)
    })

    test('Ensure getSummary is called', () => {
      part3(reductionZeroSchedule)
      expect(getSummary).toHaveBeenCalled()
    })

    test('Ensure getSummary is called once', () => {
      part3(reductionZeroSchedule)
      expect(getSummary).toHaveBeenCalledTimes(1)
    })

    test('Ensure getSummary is called with reductionZeroSchedule', () => {
      part3(reductionZeroSchedule)
      expect(getSummary).toHaveBeenCalledWith(reductionZeroSchedule)
    })
  })

  describe('recovery schedule part 3', () => {
    test('Ensure getTable is called', () => {
      part3(recoverySchedule)
      expect(getTable).toHaveBeenCalled()
    })

    test('Ensure getTable is called once', () => {
      part3(recoverySchedule)
      expect(getTable).toHaveBeenCalledTimes(1)
    })

    test('Ensure getTable is called with recoverySchedule.schedule', () => {
      part3(recoverySchedule)
      expect(getTable).toHaveBeenCalledWith(recoverySchedule.schedule)
    })

    test('Ensure getSummary is called', () => {
      part3(recoverySchedule)
      expect(getSummary).toHaveBeenCalled()
    })

    test('Ensure getSummary is called once', () => {
      part3(recoverySchedule)
      expect(getSummary).toHaveBeenCalledTimes(1)
    })

    test('Ensure getSummary is called with recoverySchedule', () => {
      part3(recoverySchedule)
      expect(getSummary).toHaveBeenCalledWith(recoverySchedule)
    })
  })
})
