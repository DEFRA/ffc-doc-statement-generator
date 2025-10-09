const { SFI23QUARTERLYSTATEMENT_MESSAGE, DELINKEDSTATEMENT_MESSAGE } = require('../../../mocks/messages/publish')
const { SFI23QUARTERLYSTATEMENT, DELINKED } = require('../../../../app/constants/document-types')

jest.mock('../../../../app/messaging/processing-alerts', () => ({
  dataProcessingAlert: jest.fn()
}))

const { validatePublish } = require('../../../../app/messaging/publish/validate-publish')

let publish
let type

describe('validate publish', () => {
  describe('when publish is an sfi23 statement', () => {
    beforeEach(() => {
      type = SFI23QUARTERLYSTATEMENT.id
    })

    describe('when publish is valid', () => {
      beforeEach(() => {
        publish = SFI23QUARTERLYSTATEMENT_MESSAGE
        type = SFI23QUARTERLYSTATEMENT.id
      })

      test('returns an object', async () => {
        const result = await validatePublish(publish, type)
        expect(result).toBeInstanceOf(Object)
      })

      test('returns an object with 3 keys', async () => {
        const result = await validatePublish(publish, type)
        expect(Object.keys(result)).toHaveLength(3)
      })

      test('returns an object with "body" key', async () => {
        const result = await validatePublish(publish, type)
        expect(Object.keys(result)).toContain('body')
      })

      test('returns publish.body for key "body"', async () => {
        const result = await validatePublish(publish, type)
        expect(result.body).toStrictEqual({ ...publish.body })
      })

      test('returns an object with "type" key', async () => {
        const result = await validatePublish(publish, type)
        expect(Object.keys(result)).toContain('type')
      })

      test('returns publish.type for key "type"', async () => {
        const result = await validatePublish(publish, type)
        expect(result.type).toStrictEqual(publish.type)
      })

      test('returns an object with "source" key', async () => {
        const result = await validatePublish(publish, type)
        expect(Object.keys(result)).toContain('source')
      })

      test('returns publish.source for key "source"', async () => {
        const result = await validatePublish(publish, type)
        expect(result.source).toStrictEqual(publish.source)
      })
    })

    describe('when publish is invalid', () => {
      beforeEach(() => {
        publish = {}
      })

      test('throws', async () => {
        await expect(validatePublish(publish, type)).rejects.toThrow()
      })

      test('throws Error', async () => {
        await expect(validatePublish(publish, type)).rejects.toThrow(Error)
      })

      test('throws error which starts "sfi-23-quarterly-statement does not have the required details"', async () => {
        await expect(validatePublish(publish, type)).rejects.toThrow(/^sfi-23-quarterly-statement does not have the required details/)
      })
    })
  })

  describe('when publish is a delinked statement', () => {
    beforeEach(() => {
      publish = DELINKEDSTATEMENT_MESSAGE
      type = DELINKED.id
    })

    describe('when publish is valid', () => {
      beforeEach(() => {
        publish = DELINKEDSTATEMENT_MESSAGE
      })

      test('returns an object', async () => {
        const result = await validatePublish(publish, type)
        expect(result).toBeInstanceOf(Object)
      })

      test('returns an object with 3 keys', async () => {
        const result = await validatePublish(publish, type)
        expect(Object.keys(result)).toHaveLength(3)
      })

      test('returns an object with "body" key', async () => {
        const result = await validatePublish(publish, type)
        expect(Object.keys(result)).toContain('body')
      })

      test('returns publish.body for key "body"', async () => {
        const result = await validatePublish(publish, type)
        expect(result.body).toStrictEqual({ ...publish.body, transactionDate: expect.any(Date) })
        expect(result.body.transactionDate.toISOString()).toBe(publish.body.transactionDate)
      })

      test('returns an object with "type" key', async () => {
        const result = await validatePublish(publish, type)
        expect(Object.keys(result)).toContain('type')
      })

      test('returns publish.type for key "type"', async () => {
        const result = await validatePublish(publish, type)
        expect(result.type).toStrictEqual(publish.type)
      })

      test('returns an object with "source" key', async () => {
        const result = await validatePublish(publish, type)
        expect(Object.keys(result)).toContain('source')
      })

      test('returns publish.source for key "source"', async () => {
        const result = await validatePublish(publish, type)
        expect(result.source).toStrictEqual(publish.source)
      })
    })

    describe('when publish is invalid', () => {
      beforeEach(() => {
        publish = {}
      })

      test('throws', async () => {
        await expect(validatePublish(publish, type)).rejects.toThrow()
      })

      test('throws Error', async () => {
        await expect(validatePublish(publish, type)).rejects.toThrow(Error)
      })

      test('throws error which starts "delinked-statement does not have the required details"', async () => {
        await expect(validatePublish(publish, type)).rejects.toThrow(/^delinked-statement does not have the required details/)
      })
    })
  })
})
