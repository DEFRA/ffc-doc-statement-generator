const { STATEMENT: STATEMENT_TYPE, SCHEDULE: SCHEDULE_TYPE } = require('../../../app/constants/document-types')

const { STATEMENT: STATEMENT_FILENAME, SCHEDULE: SCHEDULE_FILENAME } = require('../../mocks/components/filename')
const { STATEMENT_MESSAGE, SCHEDULE_MESSAGE } = require('../../mocks/messages/publish')

const createMessage = require('../../../app/messaging/publish/create-message')

let document
let filename
let type

let message

describe('create publish message', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when document is a statement', () => {
    beforeEach(() => {
      document = JSON.parse(JSON.stringify(require('../../mocks/mock-statement')))
      filename = STATEMENT_FILENAME
      type = STATEMENT_TYPE.id

      message = STATEMENT_MESSAGE
    })

    test('should return message', async () => {
      const result = createMessage(document, filename, type)
      expect(result).toStrictEqual(message)
    })
  })

  describe('when document is a schedule', () => {
    beforeEach(() => {
      document = JSON.parse(JSON.stringify(require('../../mocks/mock-schedule').topUpSchedule))
      filename = SCHEDULE_FILENAME
      type = SCHEDULE_TYPE.id

      message = SCHEDULE_MESSAGE
    })

    test('should return message', async () => {
      const result = createMessage(document, filename, type)
      expect(result).toStrictEqual(message)
    })
  })
})
