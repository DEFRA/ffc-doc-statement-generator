const orderFunding = require('../../../../../../app/generator/content/part2/get-table/order-funding')

describe('order funding', () => {
  test('returns only item if one funding option', () => {
    const fundings = [{ name: 'Arable and horticultural Soil', level: 'Introductory' }]
    const result = orderFunding(fundings)
    expect(result.length).toBe(1)
  })

  test('returns correct name if one funding option', () => {
    const fundings = [{ name: 'Arable and horticultural Soil', level: 'Introductory' }]
    const result = orderFunding(fundings)
    expect(result[0].name).toBe(fundings[0].name)
  })

  test('returns correct level if one funding option', () => {
    const fundings = [{ name: 'Arable and horticultural Soil', level: 'Introductory' }]
    const result = orderFunding(fundings)
    expect(result[0].level).toBe(fundings[0].level)
  })

  test('returns two items if two funding options', () => {
    const fundings = [
      { name: 'Arable and horticultural Soil', level: 'Introductory' },
      { name: 'Arable and horticultural Soil', level: 'Advanced' }
    ]
    const result = orderFunding(fundings)
    expect(result.length).toBe(2)
  })

  test('returns correct order if two funding options supplied already in correct order', () => {
    const fundings = [
      { name: 'Arable and horticultural Soil', level: 'Introductory' },
      { name: 'Arable and horticultural Soil', level: 'Advanced' }
    ]
    const result = orderFunding(fundings)
    expect(result[0].level).toBe(fundings[0].level)
    expect(result[1].level).toBe(fundings[1].level)
  })

  test('returns correct order if two funding options supplied in reverse order', () => {
    const fundings = [
      { name: 'Arable and horticultural Soil', level: 'Advanced' },
      { name: 'Arable and horticultural Soil', level: 'Introductory' }
    ]
    const result = orderFunding(fundings)
    expect(result[0].level).toBe(fundings[1].level)
    expect(result[1].level).toBe(fundings[0].level)
  })

  test('returns correct order if multiple funding types', () => {
    const fundings = [
      { name: 'Arable and horticultural Soil', level: 'Advanced' },
      { name: 'Improved grassland Soil', level: 'Introductory' },
      { name: 'Arable and horticultural Soil', level: 'Introductory' },
      { name: 'Improved grassland Soil', level: 'Intermediate' }
    ]
    const result = orderFunding(fundings)
    expect(result[0].name).toBe(fundings[2].name)
    expect(result[0].level).toBe(fundings[2].level)
    expect(result[1].name).toBe(fundings[0].name)
    expect(result[1].level).toBe(fundings[0].level)
    expect(result[2].name).toBe(fundings[1].name)
    expect(result[2].level).toBe(fundings[1].level)
    expect(result[3].name).toBe(fundings[3].name)
    expect(result[3].level).toBe(fundings[3].level)
  })
})
