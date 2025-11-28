const { SFI23QUARTERLYSTATEMENT_MESSAGE, DELINKEDSTATEMENT_MESSAGE } = require('../../../mocks/messages/publish')
const { SFI23QUARTERLYSTATEMENT, DELINKED } = require('../../../../app/constants/document-types')

jest.mock('ffc-alerting-utils', () => ({
  dataProcessingAlert: jest.fn()
}))

const { validatePublish } = require('../../../../app/messaging/publish/validate-publish')

let publish
let type

describe('validatePublish', () => {
  const statementTypes = [
    {
      name: 'sfi23QuarterlyStatement',
      message: SFI23QUARTERLYSTATEMENT_MESSAGE,
      typeId: SFI23QUARTERLYSTATEMENT.id,
      errorPrefix: 'sfi-23-quarterly-statement'
    },
    {
      name: 'delinkedStatement',
      message: DELINKEDSTATEMENT_MESSAGE,
      typeId: DELINKED.id,
      errorPrefix: 'delinked-statement'
    }
  ]

  statementTypes.forEach(({ name, message, typeId, errorPrefix }) => {
    describe(`when publish is a ${name}`, () => {
      beforeEach(() => {
        type = typeId
      })

      describe('when publish is valid', () => {
        beforeEach(() => {
          publish = message
        })

        test('returns an object', async () => {
          const result = await validatePublish(publish, type)
          expect(result).toBeInstanceOf(Object)
        })

        test('returns an object with 3 keys', async () => {
          const result = await validatePublish(publish, type)
          expect(Object.keys(result)).toHaveLength(3)
        })

        test.each(['body', 'type', 'source'])('returns an object with "%s" key', async (key) => {
          const result = await validatePublish(publish, type)
          expect(Object.keys(result)).toContain(key)
        })

        test('returns correct values for each key', async () => {
          const result = await validatePublish(publish, type)
          expect(result.type).toStrictEqual(publish.type)
          expect(result.source).toStrictEqual(publish.source)

          if (name === 'sfi23QuarterlyStatement') {
            expect(result.body).toStrictEqual({ ...publish.body })
          } else if (name === 'delinkedStatement') {
            expect(result.body).toStrictEqual({ ...publish.body, transactionDate: expect.any(Date) })
            expect(result.body.transactionDate.toISOString()).toBe(publish.body.transactionDate)
          }
        })
      })

      describe('when publish is invalid', () => {
        beforeEach(() => {
          publish = {}
        })

        test('throws an error', async () => {
          await expect(validatePublish(publish, type)).rejects.toThrow()
        })

        test('throws an Error object', async () => {
          await expect(validatePublish(publish, type)).rejects.toThrow(Error)
        })

        test(`throws error starting with "${errorPrefix} does not have the required details"`, async () => {
          await expect(validatePublish(publish, type)).rejects.toThrow(
            new RegExp(`^${errorPrefix} does not have the required details`)
          )
        })
      })
    })
  })
})
