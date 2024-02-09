const { STATEMENT_MESSAGE, SCHEDULE_MESSAGE } = require('../../../mocks/messages/publish')
const { STATEMENT: STATEMENT_TYPE, SCHEDULE: SCHEDULE_TYPE } = require('../../../../app/constants/document-types')

const validatePublish = require('../../../../app/messaging/publish/validate-publish')

let publish
let type

describe('validate publish', () => {
  describe('when publish is a statement', () => {
    beforeEach(() => {
      type = STATEMENT_TYPE.id
    })

    describe('when publish is valid', () => {
      beforeEach(() => {
        publish = STATEMENT_MESSAGE
        type = STATEMENT_TYPE.id
      })

      test('returns an object', () => {
        const result = validatePublish(publish, type)
        expect(result).toBeInstanceOf(Object)
      })

      test('returns an object with 3 keys', () => {
        const result = validatePublish(publish, type)
        expect(Object.keys(result)).toHaveLength(3)
      })

      test('returns an object with "body" key', () => {
        const result = validatePublish(publish, type)
        expect(Object.keys(result)).toContain('body')
      })

      test('returns publish.body for key "body"', () => {
        const result = validatePublish(publish, type)
        expect(result.body).toStrictEqual(publish.body)
      })

      test('returns an object with "type" key', () => {
        const result = validatePublish(publish, type)
        expect(Object.keys(result)).toContain('type')
      })
      test('returns publish.type for key "type"', () => {
        const result = validatePublish(publish, type)
        expect(result.type).toStrictEqual(publish.type)
      })

      test('returns an object with "source" key', () => {
        const result = validatePublish(publish, type)
        expect(Object.keys(result)).toContain('source')
      })

      test('returns publish.source for key "source"', () => {
        const result = validatePublish(publish, type)
        expect(result.source).toStrictEqual(publish.source)
      })
    })

    describe('when publish is invalid', () => {
      beforeEach(() => {
        publish = {}
      })

      test('throws', () => {
        const wrapper = () => { validatePublish(publish, type) }
        expect(wrapper).toThrow()
      })

      test('throws Error', () => {
        const wrapper = () => { validatePublish(publish, type) }
        expect(wrapper).toThrow(Error)
      })

      test('throws error which starts "statement does not have the required details"', () => {
        const wrapper = () => { validatePublish(publish, type) }
        expect(wrapper).toThrow(/^statement does not have the required details/)
      })
    })
  })

  describe('when publish is a schedule', () => {
    beforeEach(() => {
      publish = SCHEDULE_MESSAGE
      type = SCHEDULE_TYPE.id
    })

    describe('when publish is valid', () => {
      beforeEach(() => {
        publish = SCHEDULE_MESSAGE
      })

      test('returns an object', () => {
        const result = validatePublish(publish, type)
        expect(result).toBeInstanceOf(Object)
      })

      test('returns an object with 3 keys', () => {
        const result = validatePublish(publish, type)
        expect(Object.keys(result)).toHaveLength(3)
      })

      test('returns an object with "body" key', () => {
        const result = validatePublish(publish, type)
        expect(Object.keys(result)).toContain('body')
      })

      test('returns publish.body for key "body"', () => {
        const result = validatePublish(publish, type)
        expect(result.body).toStrictEqual(publish.body)
      })

      test('returns an object with "type" key', () => {
        const result = validatePublish(publish, type)
        expect(Object.keys(result)).toContain('type')
      })
      test('returns publish.type for key "type"', () => {
        const result = validatePublish(publish, type)
        expect(result.type).toStrictEqual(publish.type)
      })

      test('returns an object with "source" key', () => {
        const result = validatePublish(publish, type)
        expect(Object.keys(result)).toContain('source')
      })

      test('returns publish.source for key "source"', () => {
        const result = validatePublish(publish, type)
        expect(result.source).toStrictEqual(publish.source)
      })
    })

    describe('when publish is invalid', () => {
      beforeEach(() => {
        publish = {}
      })

      test('throws', () => {
        const wrapper = () => { validatePublish(publish, type) }
        expect(wrapper).toThrow()
      })

      test('throws Error', () => {
        const wrapper = () => { validatePublish(publish, type) }
        expect(wrapper).toThrow(Error)
      })

      test('throws error which starts "schedule does not have the required details"', () => {
        const wrapper = () => { validatePublish(publish, type) }
        expect(wrapper).toThrow(/^schedule does not have the required details/)
      })
    })
  })
})
