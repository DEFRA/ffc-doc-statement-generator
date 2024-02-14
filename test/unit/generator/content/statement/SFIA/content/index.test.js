const { SHORT_NAMES } = require('../../../../../../../app/constants/scheme-names')
const { createContent } = require('../../../.././../../../app/generator/content/statement/index')
const { createContent: createSFIContent } = require('../../../.././../../../app/generator/content/statement/SFI')
const { createContent: createSFIAContent } = require('../../../.././../../../app/generator/content/statement/SFIA')

jest.mock('../../../.././../../../app/generator/content/statement/SFI', () => ({
  createContent: jest.fn()
}))

jest.mock('../../../.././../../../app/generator/content/statement/SFIA', () => ({
  createContent: jest.fn()
}))

describe('createContent', () => {
  test('should call createSFIContent when SHORT_NAMES.SFI is selected', () => {
    const statement = {
      scheme: {
        shortName: SHORT_NAMES.SFI
      }
    }

    createContent(statement)
    expect(createSFIContent).toHaveBeenCalledWith(statement)
  })

  test('should call createSFIAContent when SHORT_NAMES.SFIA is selected', () => {
    const statement = {
      scheme: {
        shortName: SHORT_NAMES.SFIA
      }
    }

    createContent(statement)
    expect(createSFIAContent).toHaveBeenCalledWith(statement)
  })

  test('should throw an error when an unknown scheme code is selected', () => {
    const statement = {
      scheme: {
        shortName: 'unknown'
      }
    }

    expect(() => createContent(statement)).toThrow('Unknown Scheme Code: unknown')
  })
})
