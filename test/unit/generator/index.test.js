const config = require('../../../app/config')

const { SCHEDULE, STATEMENT, SFI23QUARTERLYSTATEMENT, SFI23ADVANCEDSTATEMENT } = require('../../../app/constants/document-types')

const { DATE: SYSTEM_TIME, TIMESTAMP: TIMESTAMP_SYSTEM_TIME } = require('../../mocks/components/system-time')

const { topUpSchedule: MOCK_SCHEDULE } = require('../../mocks/mock-schedule')
const MOCK_STATEMENT = require('../../mocks/mock-statement')
const MOCK_SFI23QUARTERLYSTATEMENT = require('../../mocks/mock-statement-sfi23-quarterly')

const {
  SCHEDULE: MOCK_SCHEDULE_FILENAME,
  STATEMENT: MOCK_STATEMENT_FILENAME,
  SFI23QUARTERLYSTATEMENT: MOCK_SFI23QUARTERLYSTATEMENT_FILENAME
} = require('../../mocks/components/filename')

const { mockPdfPrinter } = require('../../mocks/objects/pdfPrinter')

jest.mock('../../../app/generator/get-generations')
const getGenerations = require('../../../app/generator/get-generations')

jest.mock('../../../app/generator/get-document-definition')
const getDocumentDefinition = require('../../../app/generator/get-document-definition')

jest.mock('../../../app/generator/publish')
const publish = require('../../../app/generator/publish')

jest.mock('../../../app/messaging/publish/send-publish-message')
const sendPublishMessage = require('../../../app/messaging/publish/send-publish-message')

jest.mock('../../../app/messaging/crm/send-crm-message')
const sendCrmMessage = require('../../../app/messaging/crm/send-crm-message')

jest.mock('../../../app/generator/save-log')
const saveLog = require('../../../app/generator/save-log')

const { generateDocument } = require('../../../app/generator')

let request
let type

describe('Generate document', () => {
  beforeEach(() => {
    // Set environment variables to true
    config.sfi23QuarterlyStatementEnabled = true
    config.sendCrmMessageEnabled = true
    config.saveLogEnabled = true
    jest.useFakeTimers().setSystemTime(SYSTEM_TIME)

    getGenerations.mockResolvedValue(null)
    getDocumentDefinition.mockReturnValue('docDef')
    sendPublishMessage.mockResolvedValue(undefined)
    sendCrmMessage.mockResolvedValue(undefined)
    saveLog.mockResolvedValue(undefined)
  })

  afterEach(() => {
    // Reset environment variables after each test
    delete config.sfi23QuarterlyStatementEnabled
    delete config.sendCrmMessageEnabled
    delete config.saveLogEnabled
    jest.clearAllMocks()
  })

  describe('When schedulesArePublished is false', () => {
    beforeEach(() => {
      config.scheduleEnabled = false
    })

    describe('When document is an sfi23 quarterly-statement statement', () => {
      beforeEach(() => {
        publish.mockResolvedValue(MOCK_SFI23QUARTERLYSTATEMENT_FILENAME)
        request = JSON.parse(JSON.stringify(MOCK_SFI23QUARTERLYSTATEMENT))
        type = SFI23QUARTERLYSTATEMENT
      })

      describe('When sfi23-quarterly statement has not been processed before', () => {
        beforeEach(() => {
          getGenerations.mockResolvedValue(null)
        })

        test('should call getGenerations', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalled()
          expect(getGenerations).toHaveBeenCalledTimes(1)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('should call getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalled()
          expect(getDocumentDefinition).toHaveBeenCalledTimes(1)
          expect(getDocumentDefinition).toHaveBeenCalledWith(request, type)
        })

        test('should call mockPdfPrinter.createPdfKitDocument', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalled()
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledTimes(1)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledWith(getDocumentDefinition())
        })

        test('should call publish', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalled()
          expect(publish).toHaveBeenCalledTimes(1)
          expect(publish).toHaveBeenCalledWith(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
        })

        test('should handle excludedFromNotify correctly', async () => {
          request.excludedFromNotify = true
          await generateDocument(request, type)
          expect(sendPublishMessage).not.toHaveBeenCalled()
        })

        test('should call sendPublishMessage', async () => {
          await generateDocument(request, type)
          expect(sendPublishMessage).toHaveBeenCalled()
          expect(sendPublishMessage).toHaveBeenCalledTimes(1)
          expect(sendPublishMessage).toHaveBeenCalledWith(request, (await publish()), type.id)
        })

        test('should call sendCrmMessage', async () => {
          await generateDocument(request, type)
          expect(sendCrmMessage).toHaveBeenCalled()
          expect(sendCrmMessage).toHaveBeenCalledTimes(1)
          expect(sendCrmMessage).toHaveBeenCalledWith(request, (await publish()), type)
        })

        test('should call saveLog', async () => {
          await generateDocument(request, type)
          expect(saveLog).toHaveBeenCalled()
          expect(saveLog).toHaveBeenCalledTimes(1)
          expect(saveLog).toHaveBeenCalledWith(request, (await publish()), SYSTEM_TIME)
        })
      })

      describe('When sfi23-quarterly statement has been processed before', () => {
        beforeEach(() => {
          getGenerations.mockResolvedValue(true)
        })

        test('should call getGenerations', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalled()
          expect(getGenerations).toHaveBeenCalledTimes(1)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('should not call further processing functions', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).not.toHaveBeenCalled()
          expect(mockPdfPrinter().createPdfKitDocument).not.toHaveBeenCalled()
          expect(publish).not.toHaveBeenCalled()
          expect(sendPublishMessage).not.toHaveBeenCalled()
          expect(sendCrmMessage).not.toHaveBeenCalled()
          expect(saveLog).not.toHaveBeenCalled()
        })
      })
    })

    describe('When document is a statement', () => {
      beforeEach(() => {
        publish.mockResolvedValue(MOCK_STATEMENT_FILENAME)
        request = MOCK_STATEMENT
        type = STATEMENT
      })

      describe('When statement has not been processed before', () => {
        beforeEach(() => {
          getGenerations.mockResolvedValue(null)
        })

        test('should call getGenerations', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalled()
          expect(getGenerations).toHaveBeenCalledTimes(1)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('should call getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalled()
          expect(getDocumentDefinition).toHaveBeenCalledTimes(1)
          expect(getDocumentDefinition).toHaveBeenCalledWith(request, type)
        })

        test('should call mockPdfPrinter.createPdfKitDocument', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalled()
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledTimes(1)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledWith(getDocumentDefinition())
        })

        test('should call publish', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalled()
          expect(publish).toHaveBeenCalledTimes(1)
          expect(publish).toHaveBeenCalledWith(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
        })

        test('should call sendCrmMessage', async () => {
          await generateDocument(request, type)
          expect(sendCrmMessage).toHaveBeenCalled()
          expect(sendCrmMessage).toHaveBeenCalledTimes(1)
          expect(sendCrmMessage).toHaveBeenCalledWith(request, (await publish()), type)
        })

        test('should call saveLog', async () => {
          await generateDocument(request, type)
          expect(saveLog).toHaveBeenCalled()
          expect(saveLog).toHaveBeenCalledTimes(1)
          expect(saveLog).toHaveBeenCalledWith(request, (await publish()), SYSTEM_TIME)
        })
      })

      describe('When statement has been processed before', () => {
        beforeEach(() => {
          getGenerations.mockResolvedValue(true)
        })

        test('should call getGenerations', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalled()
          expect(getGenerations).toHaveBeenCalledTimes(1)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('should not call further processing functions', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).not.toHaveBeenCalled()
          expect(mockPdfPrinter().createPdfKitDocument).not.toHaveBeenCalled()
          expect(publish).not.toHaveBeenCalled()
          expect(sendPublishMessage).not.toHaveBeenCalled()
          expect(sendCrmMessage).not.toHaveBeenCalled()
          expect(saveLog).not.toHaveBeenCalled()
        })
      })
    })

    describe('When document is a schedule', () => {
      beforeEach(() => {
        publish.mockResolvedValue(MOCK_SCHEDULE_FILENAME)
        request = MOCK_SCHEDULE
        type = SCHEDULE
      })

      describe('When schedule has not been processed before', () => {
        beforeEach(() => {
          getGenerations.mockResolvedValue(null)
        })

        test('should call getGenerations', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalled()
          expect(getGenerations).toHaveBeenCalledTimes(1)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('should call getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalled()
          expect(getDocumentDefinition).toHaveBeenCalledTimes(1)
          expect(getDocumentDefinition).toHaveBeenCalledWith(request, type)
        })

        test('should call mockPdfPrinter.createPdfKitDocument', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalled()
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledTimes(1)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledWith(getDocumentDefinition())
        })

        test('should call publish', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalled()
          expect(publish).toHaveBeenCalledTimes(1)
          expect(publish).toHaveBeenCalledWith(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
        })

        test('should call sendCrmMessage', async () => {
          await generateDocument(request, type)
          expect(sendCrmMessage).toHaveBeenCalled()
          expect(sendCrmMessage).toHaveBeenCalledTimes(1)
          expect(sendCrmMessage).toHaveBeenCalledWith(request, (await publish()), type)
        })

        test('should call saveLog', async () => {
          await generateDocument(request, type)
          expect(saveLog).toHaveBeenCalled()
          expect(saveLog).toHaveBeenCalledTimes(1)
          expect(saveLog).toHaveBeenCalledWith(request, (await publish()), SYSTEM_TIME)
        })

        test('should not call sendPublishMessage', async () => {
          await generateDocument(request, type)
          expect(sendPublishMessage).not.toHaveBeenCalled()
        })
      })

      describe('When schedule has been processed before', () => {
        beforeEach(() => {
          getGenerations.mockResolvedValue(true)
        })

        test('should call getGenerations', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalled()
          expect(getGenerations).toHaveBeenCalledTimes(1)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('should not call further processing functions', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).not.toHaveBeenCalled()
          expect(mockPdfPrinter().createPdfKitDocument).not.toHaveBeenCalled()
          expect(publish).not.toHaveBeenCalled()
          expect(sendPublishMessage).not.toHaveBeenCalled()
          expect(sendCrmMessage).not.toHaveBeenCalled()
          expect(saveLog).not.toHaveBeenCalled()
        })
      })
    })

    describe('When document is a sfi-23-Advanced-statement', () => {
      beforeEach(() => {
        publish.mockResolvedValue(MOCK_STATEMENT_FILENAME)
        request = MOCK_STATEMENT
        type = SFI23ADVANCEDSTATEMENT
      })

      describe('When statement has not been processed before', () => {
        beforeEach(() => {
          getGenerations.mockResolvedValue(null)
        })

        test('should call getGenerations', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalled()
          expect(getGenerations).toHaveBeenCalledTimes(1)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('should call getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalled()
          expect(getDocumentDefinition).toHaveBeenCalledTimes(1)
          expect(getDocumentDefinition).toHaveBeenCalledWith(request, type)
        })

        test('should call mockPdfPrinter.createPdfKitDocument', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalled()
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledTimes(1)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledWith(getDocumentDefinition())
        })

        test('should call publish', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalled()
          expect(publish).toHaveBeenCalledTimes(1)
          expect(publish).toHaveBeenCalledWith(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
        })

        test('should call sendCrmMessage', async () => {
          await generateDocument(request, type)
          expect(sendCrmMessage).toHaveBeenCalled()
          expect(sendCrmMessage).toHaveBeenCalledTimes(1)
          expect(sendCrmMessage).toHaveBeenCalledWith(request, (await publish()), type)
        })

        test('should call saveLog', async () => {
          await generateDocument(request, type)
          expect(saveLog).toHaveBeenCalled()
          expect(saveLog).toHaveBeenCalledTimes(1)
          expect(saveLog).toHaveBeenCalledWith(request, (await publish()), SYSTEM_TIME)
        })
      })

      describe('When statement has been processed before', () => {
        beforeEach(() => {
          getGenerations.mockResolvedValue(true)
        })

        test('should call getGenerations', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalled()
          expect(getGenerations).toHaveBeenCalledTimes(1)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('should not call further processing functions', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).not.toHaveBeenCalled()
          expect(mockPdfPrinter().createPdfKitDocument).not.toHaveBeenCalled()
          expect(publish).not.toHaveBeenCalled()
          expect(sendPublishMessage).not.toHaveBeenCalled()
          expect(sendCrmMessage).not.toHaveBeenCalled()
          expect(saveLog).not.toHaveBeenCalled()
        })
      })
    })
  })
})
