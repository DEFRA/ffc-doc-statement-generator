const getAddress = require('../../../../../app/generator/content/summary/get-address')
const businessName = 'Mr A Farmer'

describe('get address', () => {
  test('returns one line address if on business name', () => {
    const address = {}
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\n')
  })

  test('returns two line address if only postcode', () => {
    const address = {
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\nNE1 1AA')
  })

  test('returns three line address if only line 1', () => {
    const address = {
      line1: 'A Farm',
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\nA Farm\nNE1 1AA')
  })

  test('returns three line address if only line 2', () => {
    const address = {
      line2: 'A Farm',
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\nA Farm\nNE1 1AA')
  })

  test('returns three line address if only line 3', () => {
    const address = {
      line3: 'A Farm',
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\nA Farm\nNE1 1AA')
  })

  test('returns three line address if only line 4', () => {
    const address = {
      line4: 'A Farm',
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\nA Farm\nNE1 1AA')
  })

  test('returns three line address if only line 5', () => {
    const address = {
      line5: 'A Farm',
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\nA Farm\nNE1 1AA')
  })

  test('returns four line address if lines in order', () => {
    const address = {
      line1: 'A Farm',
      line2: 'A Place',
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\nA Farm\nA Place\nNE1 1AA')
  })

  test('returns four line address if lines in not order', () => {
    const address = {
      line1: 'A Farm',
      line5: 'A Place',
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\nA Farm\nA Place\nNE1 1AA')
  })

  test('returns full address', () => {
    const address = {
      line1: 'A Farm',
      line2: 'A Place',
      line3: 'A Location',
      line4: 'A Town',
      line5: 'A County',
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\nA Farm\nA Place\nA Location\nA Town\nA County\nNE1 1AA')
  })

  test('ignores undefined lines', () => {
    const address = {
      line1: 'A Farm',
      line2: undefined,
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\nA Farm\nNE1 1AA')
  })

  test('ignores undefined lines if in middle lines', () => {
    const address = {
      line1: 'A Farm',
      line2: undefined,
      line3: 'A Place',
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\nA Farm\nA Place\nNE1 1AA')
  })

  test('ignores null lines', () => {
    const address = {
      line1: 'A Farm',
      line2: null,
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\nA Farm\nNE1 1AA')
  })

  test('ignores null lines if in middle lines', () => {
    const address = {
      line1: 'A Farm',
      line2: null,
      line3: 'A Place',
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\nA Farm\nA Place\nNE1 1AA')
  })

  test('ignores empty lines', () => {
    const address = {
      line1: 'A Farm',
      line2: '',
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\nA Farm\nNE1 1AA')
  })

  test('ignores empty lines if in middle lines', () => {
    const address = {
      line1: 'A Farm',
      line2: '',
      line3: 'A Place',
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.text).toMatch('Mr A Farmer\nA Farm\nA Place\nNE1 1AA')
  })

  test('returns address style', () => {
    const address = {
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.style).toMatch('address')
  })

  test('returns correct location x axis', () => {
    const address = {
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.absolutePosition.x).toBe(28.35)
  })

  test('returns correct location y axis', () => {
    const address = {
      postcode: 'NE1 1AA'
    }
    const result = getAddress(businessName, address)
    expect(result.absolutePosition.y).toBe(99.225)
  })
})
