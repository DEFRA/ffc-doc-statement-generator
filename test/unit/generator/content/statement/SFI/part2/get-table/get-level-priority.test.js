const getLevelPriority = require('../../../../../../../../app/generator/content/statement/SFI/part3/get-table/get-level-priority')

describe('get level priority', () => {
  test('returns 1 if level is Introductory', () => {
    const result = getLevelPriority('Introductory')
    expect(result).toBe(1)
  })

  test('returns 2 if level is Intermediate', () => {
    const result = getLevelPriority('Intermediate')
    expect(result).toBe(2)
  })

  test('returns 3 if level is Advanced', () => {
    const result = getLevelPriority('Advanced')
    expect(result).toBe(3)
  })

  test('returns 4 if level is Additional', () => {
    const result = getLevelPriority('Additional')
    expect(result).toBe(4)
  })

  test('returns 5 if level is anything else', () => {
    const result = getLevelPriority('anything else')
    expect(result).toBe(5)
  })
})
