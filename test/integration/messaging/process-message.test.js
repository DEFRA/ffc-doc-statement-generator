const moment = require('moment')
const { BlobServiceClient } = require('@azure/storage-blob')

const config = require('../../../app/config')
const db = require('../../../app/data')

const { STATEMENT, SCHEDULE } = require('../../../app/constants/document-types')

const { DATE } = require('../../mocks/components/system-time')
const {
  STATEMENT: STATEMENT_FILENAME,
  STATEMENT_EARLIER: STATEMENT_EARLIER_FILENAME,
  SCHEDULE: SCHEDULE_FILENAME,
  SCHEDULE_EARLIER: SCHEDULE_EARLIER_FILENAME
} = require('../../mocks/components/filename')

const { mockMessageSender } = require('../../mocks/modules/ffc-messaging')

const processMessage = require('../../../app/messaging/process-message')

let blobServiceClient
let container

let receiver

let statement
let schedule

let message

describe('process message', () => {
  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(DATE)

    blobServiceClient = BlobServiceClient.fromConnectionString(config.storageConfig.connectionStr)
    container = blobServiceClient.getContainerClient(config.storageConfig.container)

    await container.deleteIfExists()
    await container.createIfNotExists()

    receiver = {
      completeMessage: jest.fn()
    }
  })

  afterEach(async () => {
    jest.clearAllMocks()
    await db.sequelize.truncate({ cascade: true })
  })

  afterAll(async () => {
    await db.sequelize.close()
  })

  describe('When schedulesArePublished is false', () => {
    beforeEach(() => {
      config.schedulesArePublished = false
    })

    describe('when message is a statement', () => {
      beforeEach(async () => {
        statement = JSON.parse(JSON.stringify(require('../../mocks/mock-statement')))
        schedule = JSON.parse(JSON.stringify(require('../../mocks/mock-schedule').topUpSchedule))
        message = {
          body: statement,
          applicationProperties: {
            type: STATEMENT.type
          }
        }
      })

      describe('When statement has not been processed before', () => {
        test('should publish file with name STATEMENT_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${STATEMENT_FILENAME}`)
        })

        test('should save 1 log entry', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(log).not.toBeNull()
        })

        test('should save log entry with statement data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          delete statement.documentReference
          expect(log.statementData).toStrictEqual(statement)
        })

        test('should save log entry with statement data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with statement STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.filename).toBe(STATEMENT_FILENAME)
        })

        test('should send crm message with statement api link that contains STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[1][0].body.apiLink).toContain(STATEMENT_FILENAME)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When statement has been processed before', () => {
        beforeEach(async () => {
          const { documentReference: documentRef, ...data } = statement

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: STATEMENT_EARLIER_FILENAME,
            dateGenerated: moment(new Date()).subtract(1, 'days')
          })
        })

        test('should not publish file with name STATEMENT_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).not.toContain(`${config.storageConfig.folder}/${STATEMENT_FILENAME}`)
        })

        test('should not save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: STATEMENT_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).toBeNull()
        })

        test('should not send messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).not.toHaveBeenCalled()
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When statement has null documentReference and nulls exist in table', () => {
        beforeEach(async () => {
          message = {
            body: { ...statement, documentReference: null },
            applicationProperties: {
              type: STATEMENT.type
            }
          }

          const { documentReference: _, ...data } = statement

          await db.generation.create({
            statementData: data,
            documentReference: null,
            filename: STATEMENT_EARLIER_FILENAME,
            dateGenerated: new Date()
          })
        })

        test('should publish file with name STATEMENT_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${STATEMENT_FILENAME}`)
        })

        test('should save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: STATEMENT_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).not.toBeNull()
        })

        test('should save log entry with statement data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          delete statement.documentReference
          expect(log.statementData).toStrictEqual(statement)
        })

        test('should save log entry with statement data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with statement STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.filename).toBe(STATEMENT_FILENAME)
        })

        test('should send crm message with statement api link that contains STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[1][0].body.apiLink).toContain(STATEMENT_FILENAME)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When statement has null documentReference and no nulls exist in table', () => {
        beforeEach(async () => {
          message = {
            body: { ...statement, documentReference: null },
            applicationProperties: {
              type: STATEMENT.type
            }
          }

          const { documentReference: documentRef, ...data } = statement

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: STATEMENT_EARLIER_FILENAME,
            dateGenerated: new Date()
          })
        })

        test('should publish file with name STATEMENT_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${STATEMENT_FILENAME}`)
        })

        test('should save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: STATEMENT_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).not.toBeNull()
        })

        test('should save log entry with statement data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          delete statement.documentReference
          expect(log.statementData).toStrictEqual(statement)
        })

        test('should save log entry with statement data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with statement STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.filename).toBe(STATEMENT_FILENAME)
        })

        test('should send crm message with statement api link that contains STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[1][0].body.apiLink).toContain(STATEMENT_FILENAME)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When 2 statements are sent', () => {
        test('should publish 1 file to archive blob storage location', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toHaveLength(1)
        })

        test('should publish file with name STATEMENT_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${STATEMENT_FILENAME}`)
        })

        test('should save 1 log entry', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findAll({ where: { documentReference: message.body.documentReference } })
          expect(log).toHaveLength(1)
        })

        test('should save log entry with statement data', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          delete statement.documentReference
          expect(log.statementData).toStrictEqual(statement)
        })

        test('should save log entry with statement data with no document reference', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with statement STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.filename).toBe(STATEMENT_FILENAME)
        })

        test('should send crm message with statement api link that contains STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(mockMessageSender().sendMessage.mock.calls[1][0].body.apiLink).toContain(STATEMENT_FILENAME)
        })

        test('should complete both messages', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(receiver.completeMessage).toHaveBeenCalledTimes(2)
        })
      })

      describe('When schedule has been processed before with same documentReference', () => {
        beforeEach(async () => {
          const { documentReference: documentRef, ...data } = schedule

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: SCHEDULE_EARLIER_FILENAME,
            dateGenerated: moment(new Date()).subtract(1, 'days')
          })
        })

        test('should not publish file with name STATEMENT_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).not.toContain(`${config.storageConfig.folder}/${STATEMENT_FILENAME}`)
        })

        test('should not save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: SCHEDULE_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).toBeNull()
        })

        test('should not send messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).not.toHaveBeenCalled()
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })
    })

    describe('when message is a schedule', () => {
      beforeEach(async () => {
        schedule = JSON.parse(JSON.stringify(require('../../mocks/mock-schedule').topUpSchedule))
        statement = JSON.parse(JSON.stringify(require('../../mocks/mock-statement')))
        message = {
          body: schedule,
          applicationProperties: {
            type: SCHEDULE.type
          }
        }
      })

      describe('When schedule has not been processed before', () => {
        test('should publish file with name SCHEDULE_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${SCHEDULE_FILENAME}`)
        })

        test('should save 1 log entry', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(log).not.toBeNull()
        })

        test('should save log entry with schedule data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          delete schedule.documentReference
          expect(log.statementData).toStrictEqual(schedule)
        })

        test('should save log entry with schedule data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 1 message for crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
        })

        test('should send crm message with schedule api link that contains SCHEDULE_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.apiLink).toContain(SCHEDULE_FILENAME)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When schedule has been processed before', () => {
        beforeEach(async () => {
          const { documentReference: documentRef, ...data } = schedule

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: STATEMENT_EARLIER_FILENAME,
            dateGenerated: moment(new Date()).subtract(1, 'days')
          })
        })

        test('should not publish file with name SCHEDULE_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).not.toContain(`${config.storageConfig.folder}/${SCHEDULE_FILENAME}`)
        })

        test('should not save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: STATEMENT_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).toBeNull()
        })

        test('should not send message for crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).not.toHaveBeenCalled()
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When schedule has null documentReference and nulls exist in table', () => {
        beforeEach(async () => {
          message = {
            body: { ...schedule, documentReference: null },
            applicationProperties: {
              type: SCHEDULE.type
            }
          }

          const { documentReference: _, ...data } = schedule

          await db.generation.create({
            statementData: data,
            documentReference: null,
            filename: STATEMENT_EARLIER_FILENAME,
            dateGenerated: new Date()
          })
        })

        test('should publish file with name SCHEDULE_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${SCHEDULE_FILENAME}`)
        })

        test('should save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: STATEMENT_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).not.toBeNull()
        })

        test('should save log entry with schedule data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          delete schedule.documentReference
          expect(log.statementData).toStrictEqual(schedule)
        })

        test('should save log entry with schedule data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 1 message for crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
        })

        test('should send crm message with schedule api link that contains SCHEDULE_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.apiLink).toContain(SCHEDULE_FILENAME)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When schedule has null documentReference and no nulls exist in table', () => {
        beforeEach(async () => {
          message = {
            body: { ...schedule, documentReference: null },
            applicationProperties: {
              type: SCHEDULE.type
            }
          }

          const { documentReference: documentRef, ...data } = schedule

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: STATEMENT_EARLIER_FILENAME,
            dateGenerated: new Date()
          })
        })

        test('should publish file with name SCHEDULE_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${SCHEDULE_FILENAME}`)
        })

        test('should save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: STATEMENT_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).not.toBeNull()
        })

        test('should save log entry with schedule data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          delete schedule.documentReference
          expect(log.statementData).toStrictEqual(schedule)
        })

        test('should save log entry with schedule data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 1 message for crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
        })

        test('should send crm message with schedule api link that contains SCHEDULE_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.apiLink).toContain(SCHEDULE_FILENAME)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When 2 schedules are sent', () => {
        test('should publish 1 file to archive blob storage location', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toHaveLength(1)
        })

        test('should publish file with name SCHEDULE_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${SCHEDULE_FILENAME}`)
        })

        test('should save 1 log entry', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findAll({ where: { documentReference: message.body.documentReference } })
          expect(log).toHaveLength(1)
        })

        test('should save log entry with schedule data', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          delete schedule.documentReference
          expect(log.statementData).toStrictEqual(schedule)
        })

        test('should save log entry with schedule data with no document reference', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 1 message for crm', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(1)
        })

        test('should send crm message with schedule api link that contains SCHEDULE_FILENAME', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.apiLink).toContain(SCHEDULE_FILENAME)
        })

        test('should complete both messages', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(receiver.completeMessage).toHaveBeenCalledTimes(2)
        })
      })

      describe('When statement has been processed before with same documentReference', () => {
        beforeEach(async () => {
          const { documentReference: documentRef, ...data } = statement

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: STATEMENT_EARLIER_FILENAME,
            dateGenerated: moment(new Date()).subtract(1, 'days')
          })
        })

        test('should not publish file with name SCHEDULE_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).not.toContain(`${config.storageConfig.folder}/${SCHEDULE_FILENAME}`)
        })

        test('should not save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: STATEMENT_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).toBeNull()
        })

        test('should not send messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).not.toHaveBeenCalled()
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })
    })
  })

  describe('When schedulesArePublished is true', () => {
    beforeEach(() => {
      config.schedulesArePublished = true
    })

    describe('when message is a statement', () => {
      beforeEach(async () => {
        statement = JSON.parse(JSON.stringify(require('../../mocks/mock-statement')))
        schedule = JSON.parse(JSON.stringify(require('../../mocks/mock-schedule').topUpSchedule))
        message = {
          body: statement,
          applicationProperties: {
            type: STATEMENT.type
          }
        }
      })

      describe('When statement has not been processed before', () => {
        test('should publish file with name STATEMENT_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${STATEMENT_FILENAME}`)
        })

        test('should save 1 log entry', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(log).not.toBeNull()
        })

        test('should save log entry with statement data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          delete statement.documentReference
          expect(log.statementData).toStrictEqual(statement)
        })

        test('should save log entry with statement data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with statement STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.filename).toBe(STATEMENT_FILENAME)
        })

        test('should send crm message with statement api link that contains STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[1][0].body.apiLink).toContain(STATEMENT_FILENAME)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When statement has been processed before', () => {
        beforeEach(async () => {
          const { documentReference: documentRef, ...data } = statement

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: STATEMENT_EARLIER_FILENAME,
            dateGenerated: moment(new Date()).subtract(1, 'days')
          })
        })

        test('should not publish file with name STATEMENT_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).not.toContain(`${config.storageConfig.folder}/${STATEMENT_FILENAME}`)
        })

        test('should not save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: STATEMENT_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).toBeNull()
        })

        test('should not send messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).not.toHaveBeenCalled()
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When statement has null documentReference and nulls exist in table', () => {
        beforeEach(async () => {
          message = {
            body: { ...statement, documentReference: null },
            applicationProperties: {
              type: STATEMENT.type
            }
          }

          const { documentReference: _, ...data } = statement

          await db.generation.create({
            statementData: data,
            documentReference: null,
            filename: STATEMENT_EARLIER_FILENAME,
            dateGenerated: new Date()
          })
        })

        test('should publish file with name STATEMENT_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${STATEMENT_FILENAME}`)
        })

        test('should save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: STATEMENT_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).not.toBeNull()
        })

        test('should save log entry with statement data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          delete statement.documentReference
          expect(log.statementData).toStrictEqual(statement)
        })

        test('should save log entry with statement data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with statement STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.filename).toBe(STATEMENT_FILENAME)
        })

        test('should send crm message with statement api link that contains STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[1][0].body.apiLink).toContain(STATEMENT_FILENAME)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When statement has null documentReference and no nulls exist in table', () => {
        beforeEach(async () => {
          message = {
            body: { ...statement, documentReference: null },
            applicationProperties: {
              type: STATEMENT.type
            }
          }

          const { documentReference: documentRef, ...data } = statement

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: STATEMENT_EARLIER_FILENAME,
            dateGenerated: new Date()
          })
        })

        test('should publish file with name STATEMENT_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${STATEMENT_FILENAME}`)
        })

        test('should save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: STATEMENT_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).not.toBeNull()
        })

        test('should save log entry with statement data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          delete statement.documentReference
          expect(log.statementData).toStrictEqual(statement)
        })

        test('should save log entry with statement data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with statement STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.filename).toBe(STATEMENT_FILENAME)
        })

        test('should send crm message with statement api link that contains STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[1][0].body.apiLink).toContain(STATEMENT_FILENAME)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When 2 statements are sent', () => {
        test('should publish 1 file to archive blob storage location', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toHaveLength(1)
        })

        test('should publish file with name STATEMENT_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${STATEMENT_FILENAME}`)
        })

        test('should save 1 log entry', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findAll({ where: { documentReference: message.body.documentReference } })
          expect(log).toHaveLength(1)
        })

        test('should save log entry with statement data', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          delete statement.documentReference
          expect(log.statementData).toStrictEqual(statement)
        })

        test('should save log entry with statement data with no document reference', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with statement STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.filename).toBe(STATEMENT_FILENAME)
        })

        test('should send crm message with statement api link that contains STATEMENT_FILENAME', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(mockMessageSender().sendMessage.mock.calls[1][0].body.apiLink).toContain(STATEMENT_FILENAME)
        })

        test('should complete both messages', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(receiver.completeMessage).toHaveBeenCalledTimes(2)
        })
      })

      describe('When statement has been processed before with same documentReference', () => {
        beforeEach(async () => {
          const { documentReference: documentRef, ...data } = schedule

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: SCHEDULE_EARLIER_FILENAME,
            dateGenerated: moment(new Date()).subtract(1, 'days')
          })
        })

        test('should not publish file with name STATEMENT_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).not.toContain(`${config.storageConfig.folder}/${STATEMENT_FILENAME}`)
        })

        test('should not save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: SCHEDULE_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: STATEMENT_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).toBeNull()
        })

        test('should not send messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).not.toHaveBeenCalled()
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })
    })

    describe('when message is a schedule', () => {
      beforeEach(async () => {
        schedule = JSON.parse(JSON.stringify(require('../../mocks/mock-schedule').topUpSchedule))
        statement = JSON.parse(JSON.stringify(require('../../mocks/mock-statement')))
        message = {
          body: schedule,
          applicationProperties: {
            type: SCHEDULE.type
          }
        }
      })

      describe('When schedule has not been processed before', () => {
        test('should publish file with name SCHEDULE_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${SCHEDULE_FILENAME}`)
        })

        test('should save 1 log entry', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(log).not.toBeNull()
        })

        test('should save log entry with schedule data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          delete schedule.documentReference
          expect(log.statementData).toStrictEqual(schedule)
        })

        test('should save log entry with schedule data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with schedule SCHEDULE_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.filename).toBe(SCHEDULE_FILENAME)
        })

        test('should send crm message with schedule api link that contains SCHEDULE_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[1][0].body.apiLink).toContain(SCHEDULE_FILENAME)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When schedule has been processed before', () => {
        beforeEach(async () => {
          const { documentReference: documentRef, ...data } = schedule

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: STATEMENT_EARLIER_FILENAME,
            dateGenerated: moment(new Date()).subtract(1, 'days')
          })
        })

        test('should not publish file with name SCHEDULE_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).not.toContain(`${config.storageConfig.folder}/${SCHEDULE_FILENAME}`)
        })

        test('should not save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: STATEMENT_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).toBeNull()
        })

        test('should not send messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).not.toHaveBeenCalled()
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When schedule has null documentReference and nulls exist in table', () => {
        beforeEach(async () => {
          message = {
            body: { ...schedule, documentReference: null },
            applicationProperties: {
              type: SCHEDULE.type
            }
          }

          const { documentReference: _, ...data } = schedule

          await db.generation.create({
            statementData: data,
            documentReference: null,
            filename: STATEMENT_EARLIER_FILENAME,
            dateGenerated: new Date()
          })
        })

        test('should publish file with name SCHEDULE_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${SCHEDULE_FILENAME}`)
        })

        test('should save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: STATEMENT_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).not.toBeNull()
        })

        test('should save log entry with schedule data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          delete schedule.documentReference
          expect(log.statementData).toStrictEqual(schedule)
        })

        test('should save log entry with schedule data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with schedule fileSCHEDULE_FILENAMEname', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.filename).toBe(SCHEDULE_FILENAME)
        })

        test('should send crm message with schedule api link that contains SCHEDULE_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[1][0].body.apiLink).toContain(SCHEDULE_FILENAME)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When schedule has null documentReference and no nulls exist in table', () => {
        beforeEach(async () => {
          message = {
            body: { ...schedule, documentReference: null },
            applicationProperties: {
              type: SCHEDULE.type
            }
          }

          const { documentReference: documentRef, ...data } = schedule

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: STATEMENT_EARLIER_FILENAME,
            dateGenerated: new Date()
          })
        })

        test('should publish file with name SCHEDULE_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${SCHEDULE_FILENAME}`)
        })

        test('should save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: STATEMENT_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).not.toBeNull()
        })

        test('should save log entry with schedule data', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          delete schedule.documentReference
          expect(log.statementData).toStrictEqual(schedule)
        })

        test('should save log entry with schedule data with no document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with schedule SCHEDULE_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.filename).toBe(SCHEDULE_FILENAME)
        })

        test('should send crm message with schedule api link that contains SCHEDULE_FILENAME', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage.mock.calls[1][0].body.apiLink).toContain(SCHEDULE_FILENAME)
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })

      describe('When 2 schedules are sent', () => {
        test('should publish 1 file to archive blob storage location', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toHaveLength(1)
        })

        test('should publish file with name SCHEDULE_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).toContain(`${config.storageConfig.folder}/${SCHEDULE_FILENAME}`)
        })

        test('should save 1 log entry', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findAll({ where: { documentReference: message.body.documentReference } })
          expect(log).toHaveLength(1)
        })

        test('should save log entry with schedule data', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          delete schedule.documentReference
          expect(log.statementData).toStrictEqual(schedule)
        })

        test('should save log entry with schedule data with no document reference', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(Object.keys(message.body)).toContain('documentReference')
          expect(Object.keys(log.statementData)).not.toContain('documentReference')
        })

        test('should save log entry with document reference', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(log.documentReference).toStrictEqual(message.body.documentReference)
        })

        test('should save log entry with generation date', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          const log = await db.generation.findOne({ where: { documentReference: message.body.documentReference } })
          expect(log.dateGenerated).toStrictEqual(new Date())
        })

        test('should send 2 messages for publish and crm', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(mockMessageSender().sendMessage).toHaveBeenCalledTimes(2)
        })

        test('should send publish message with schedule SCHEDULE_FILENAME', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(mockMessageSender().sendMessage.mock.calls[0][0].body.filename).toBe(SCHEDULE_FILENAME)
        })

        test('should send crm message with schedule api link that contains SCHEDULE_FILENAME', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(mockMessageSender().sendMessage.mock.calls[1][0].body.apiLink).toContain(SCHEDULE_FILENAME)
        })

        test('should complete both messages', async () => {
          await processMessage(message, receiver)
          await processMessage(message, receiver)

          expect(receiver.completeMessage).toHaveBeenCalledTimes(2)
        })
      })

      describe('When schedule has been processed before with same documentReference', () => {
        beforeEach(async () => {
          const { documentReference: documentRef, ...data } = statement

          await db.generation.create({
            statementData: data,
            documentReference: documentRef,
            filename: STATEMENT_EARLIER_FILENAME,
            dateGenerated: moment(new Date()).subtract(1, 'days')
          })
        })

        test('should not publish file with name SCHEDULE_FILENAME to archive blob storage location', async () => {
          await processMessage(message, receiver)

          const fileList = []
          for await (const item of container.listBlobsFlat({ prefix: config.storageConfig.archiveFolder })) {
            fileList.push(item.name)
          }
          expect(fileList).not.toContain(`${config.storageConfig.folder}/${SCHEDULE_FILENAME}`)
        })

        test('should not save another log entry', async () => {
          const logBefore = await db.generation.findOne({ where: { filename: STATEMENT_EARLIER_FILENAME } })

          await processMessage(message, receiver)

          const logAfter = await db.generation.findOne({ where: { filename: SCHEDULE_FILENAME } })
          expect(logBefore).not.toBeNull()
          expect(logAfter).toBeNull()
        })

        test('should not send messages for publish and crm', async () => {
          await processMessage(message, receiver)
          expect(mockMessageSender().sendMessage).not.toHaveBeenCalled()
        })

        test('should complete message', async () => {
          await processMessage(message, receiver)
          expect(receiver.completeMessage).toHaveBeenCalled()
        })
      })
    })
  })
})
