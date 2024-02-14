const part3 = require('../../../../../../app/generator/content/schedule/part3')

const { topUpSchedule, reductionSchedule, reductionZeroSchedule, recoverySchedule } = require('../../../../../mocks/mock-schedule')

describe('schedule part 3', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('top-up schedule part 3', () => {
    test('Ensure header style is set to header3', () => {
      const result = part3(topUpSchedule)
      expect(result.stack[0].style).toBe('header3')
    })

    test('Ensure title text is "Payment schedule"', () => {
      const result = part3(topUpSchedule)
      expect(result.stack[0].text).toBe('Payment schedule')
    })

    test('includes unbreakable instruction', () => {
      const result = part3(topUpSchedule)
      expect(result.unbreakable).toBeTruthy()
    })
  })

  describe('reduction schedule part 3', () => {
    test('Ensure header style is set to header3', () => {
      const result = part3(reductionSchedule)
      expect(result.stack[0].style).toBe('header3')
    })

    test('Ensure title text is "Payment schedule"', () => {
      const result = part3(reductionSchedule)
      expect(result.stack[0].text).toBe('Payment schedule')
    })

    test('includes unbreakable instruction', () => {
      const result = part3(reductionSchedule)
      expect(result.unbreakable).toBeTruthy()
    })
  })

  describe('reduction Zero schedule part 3', () => {
    test('Ensure header style is set to header3', () => {
      const result = part3(reductionZeroSchedule)
      expect(result.stack[0].style).toBe('header3')
    })

    test('Ensure  title text is "Payment schedule"', () => {
      const result = part3(reductionZeroSchedule)
      expect(result.stack[0].text).toBe('Payment schedule')
    })

    test('includes unbreakable instruction', () => {
      const result = part3(reductionZeroSchedule)
      expect(result.unbreakable).toBeTruthy()
    })
  })

  describe('recovery schedule part 3', () => {
    test('Ensure header style is set to header3', () => {
      const result = part3(recoverySchedule)
      expect(result.stack[0].style).toBe('header3')
    })

    test('Ensure  title text is "Payment schedule"', () => {
      const result = part3(recoverySchedule)
      expect(result.stack[0].text).toBe('Payment schedule')
    })

    test('includes unbreakable instruction', () => {
      const result = part3(recoverySchedule)
      expect(result.unbreakable).toBeTruthy()
    })
  })
})
