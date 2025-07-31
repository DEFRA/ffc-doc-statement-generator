const config = require('../../../app/config')

const { SCHEDULE, STATEMENT, SFI23QUARTERLYSTATEMENT, SFI23ADVANCEDSTATEMENT, DELINKED } = require('../../../app/constants/document-types')

const { DATE: SYSTEM_TIME, TIMESTAMP: TIMESTAMP_SYSTEM_TIME } = require('../../mocks/components/system-time')

const { topUpSchedule: MOCK_SCHEDULE } = require('../../mocks/mock-schedule')
const MOCK_STATEMENT = require('../../mocks/mock-statement')
const MOCK_SFI23QUARTERLYSTATEMENT = require('../../mocks/mock-statement-sfi23-quarterly')
const MOCK_DELINKEDSTATEMENT = require('../../mocks/mock-delinked-statement')

const {
  SCHEDULE: MOCK_SCHEDULE_FILENAME,
  STATEMENT: MOCK_STATEMENT_FILENAME,
  SFI23QUARTERLYSTATEMENT: MOCK_SFI23QUARTERLYSTATEMENT_FILENAME,
  DELINKEDSTATEMENT: MOCK_DELINKED_FILENAME
} = require('../../mocks/components/filename')

const { mockPdfPrinter } = require('../../mocks/objects/pdfPrinter')

jest.mock('../../../app/generator/get-generations')
const getGenerations = require('../../../app/generator/get-generations')

jest.mock('../../../app/generator/get-document-definition')
const getDocumentDefinition = require('../../../app/generator/get-document-definition')

jest.mock('../../../app/generator/publish')
const publish = require('../../../app/generator/publish')

jest.mock('../../../app/generator/save-outbound-statement')
const { saveOutboundStatement } = require('../../../app/generator/save-outbound-statement')

const { generateDocument } = require('../../../app/generator')

let request
let type

describe('Generate document', () => {
  beforeEach(() => {
    config.sfi23QuarterlyStatementEnabled = true
    config.sendDelinked2024Statements = false
    jest.useFakeTimers().setSystemTime(SYSTEM_TIME)

    getGenerations.mockResolvedValue(null)
    getDocumentDefinition.mockReturnValue('docDef')
  })

  afterEach(() => {
    delete config.sfi23QuarterlyStatementEnabled
    delete config.sendCrmMessageEnabled
    delete config.saveLogEnabled
    delete config.sendDelinked2024Statements
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

        test('sfi23-quarterly should call getGenerations', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalled()
        })

        test('sfi23-quarterly should call getGenerations once', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledTimes(1)
        })

        test('sfi23-quarterly should call getGenerations with request.documentReference', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('sfi23-quarterly should call getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalled()
        })

        test('sfi23-quarterly should call getDocumentDefinition once', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalledTimes(1)
        })

        test('sfi23-quarterly should call getDocumentDefinition with request and type', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalledWith(request, type)
        })

        test('sfi23-quarterly should call mockPdfPrinter.createPdfKitDocument', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalled()
        })

        test('sfi23-quarterly should call mockPdfPrinter.createPdfKitDocument once', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledTimes(1)
        })

        test('sfi23-quarterly should call mockPdfPrinter.createPdfKitDocument with getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledWith(getDocumentDefinition())
        })

        test('sfi23-quarterly should call publish', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalled()
        })

        test('sfi23-quarterly should call publish once', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalledTimes(1)
        })

        test('sfi23-quarterly should call publish with mockPdfPrinter.createPdfKitDocument, request, TIMESTAMP_SYSTEM_TIME and type', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalledWith(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
        })

        test('sfi23-quarterly should call saveOutboundStatement', async () => {
          await generateDocument(request, type)
          expect(saveOutboundStatement).toHaveBeenCalled()
        })

        test('sfi23-quarterly should call saveOutboundStatement once', async () => {
          await generateDocument(request, type)
          expect(saveOutboundStatement).toHaveBeenCalledTimes(1)
        })

        test('sfi23-quarterly should call saveOutboundStatement with correct parameters', async () => {
          const filename = await publish(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
          await generateDocument(request, type)
          expect(saveOutboundStatement).toHaveBeenCalledWith(request, filename, type)
        })
      })

      describe('When sfi23-quarterly statement has been processed before', () => {
        beforeEach(() => {
          getGenerations.mockResolvedValue(true)
        })

        test('sfi23-quarterly should call getGenerations', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalled()
        })

        test('sfi23-quarterly should call getGenerations once', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledTimes(1)
        })

        test('sfi23-quarterly should call getGenerations with request.documentReference', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('sfi23-quarterly should not call getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).not.toHaveBeenCalled()
        })

        test('sfi23-quarterly should not call mockPdfPrinter.createPdfKitDocument', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).not.toHaveBeenCalled()
        })

        test('sfi23-quarterly should not call publish', async () => {
          await generateDocument(request, type)
          expect(publish).not.toHaveBeenCalled()
        })

        test('sfi23-quarterly should not call saveOutboundStatement', async () => {
          await generateDocument(request, type)
          expect(saveOutboundStatement).not.toHaveBeenCalled()
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
        })

        test('should call getGenerations once', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledTimes(1)
        })

        test('should call getGenerations with request.documentReference', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('should call getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalled()
        })

        test('should call getDocumentDefinition once', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalledTimes(1)
        })

        test('should call getDocumentDefinition with request and type', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalledWith(request, type)
        })

        test('should call mockPdfPrinter.createPdfKitDocument', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalled()
        })

        test('should call mockPdfPrinter.createPdfKitDocument once', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledTimes(1)
        })

        test('should call mockPdfPrinter.createPdfKitDocument with getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledWith(getDocumentDefinition())
        })

        test('should call publish', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalled()
        })

        test('should call publish once', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalledTimes(1)
        })

        test('should call publish with mockPdfPrinter.createPdfKitDocument, request, TIMESTAMP_SYSTEM_TIME and type', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalledWith(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
        })

        test('should call saveOutboundStatement', async () => {
          await generateDocument(request, type)
          expect(saveOutboundStatement).toHaveBeenCalled()
        })

        test('should call saveOutboundStatement once', async () => {
          await generateDocument(request, type)
          expect(saveOutboundStatement).toHaveBeenCalledTimes(1)
        })

        test('should call saveOutboundStatement with correct parameters', async () => {
          const filename = await publish(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
          await generateDocument(request, type)
          expect(saveOutboundStatement).toHaveBeenCalledWith(request, filename, type)
        })
      })

      describe('When statement has been processed before', () => {
        beforeEach(() => {
          getGenerations.mockResolvedValue(true)
        })

        test('should call getGenerations', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalled()
        })

        test('should call getGenerations once', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledTimes(1)
        })

        test('should call getGenerations with request.documentReference', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('should not call getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).not.toHaveBeenCalled()
        })

        test('should not call mockPdfPrinter.createPdfKitDocument', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).not.toHaveBeenCalled()
        })

        test('should not call publish', async () => {
          await generateDocument(request, type)
          expect(publish).not.toHaveBeenCalled()
        })

        test('should not call saveOutboundStatement', async () => {
          await generateDocument(request, type)
          expect(saveOutboundStatement).not.toHaveBeenCalled()
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
        })

        test('should call getGenerations once', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledTimes(1)
        })

        test('should call getGenerations with request.documentReference', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('should call getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalled()
        })

        test('should call getDocumentDefinition once', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalledTimes(1)
        })

        test('should call getDocumentDefinition with request and type', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalledWith(request, type)
        })

        test('should call mockPdfPrinter.createPdfKitDocument', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalled()
        })

        test('should call mockPdfPrinter.createPdfKitDocument once', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledTimes(1)
        })

        test('should call mockPdfPrinter.createPdfKitDocument with getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledWith(getDocumentDefinition())
        })

        test('should call publish', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalled()
        })

        test('should call publish once', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalledTimes(1)
        })

        test('should call publish with mockPdfPrinter.createPdfKitDocument, request, TIMESTAMP_SYSTEM_TIME and type', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalledWith(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
        })

        test('should call saveOutboundStatement', async () => {
          await generateDocument(request, type)
          expect(saveOutboundStatement).toHaveBeenCalled()
        })

        test('should call saveOutboundStatement once', async () => {
          await generateDocument(request, type)
          expect(saveOutboundStatement).toHaveBeenCalledTimes(1)
        })

        test('should call saveOutboundStatement with correct parameters', async () => {
          const filename = await publish(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
          await generateDocument(request, type)
          expect(saveOutboundStatement).toHaveBeenCalledWith(request, filename, type)
        })
      })

      describe('When schedule has been processed before', () => {
        beforeEach(() => {
          getGenerations.mockResolvedValue(true)
        })

        test('should call getGenerations', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalled()
        })

        test('should call getGenerations once', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledTimes(1)
        })

        test('should call getGenerations with request.documentReference', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('should not call getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).not.toHaveBeenCalled()
        })

        test('should not call mockPdfPrinter.createPdfKitDocument', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).not.toHaveBeenCalled()
        })

        test('should not call publish', async () => {
          await generateDocument(request, type)
          expect(publish).not.toHaveBeenCalled()
        })

        test('should not call saveOutboundStatement', async () => {
          await generateDocument(request, type)
          expect(saveOutboundStatement).not.toHaveBeenCalled()
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
        })

        test('should call getGenerations once', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledTimes(1)
        })

        test('should call getGenerations with request.documentReference', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('should call getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalled()
        })

        test('should call getDocumentDefinition once', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalledTimes(1)
        })

        test('should call getDocumentDefinition with request and type', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalledWith(request, type)
        })

        test('should call mockPdfPrinter.createPdfKitDocument', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalled()
        })

        test('should call mockPdfPrinter.createPdfKitDocument once', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledTimes(1)
        })

        test('should call mockPdfPrinter.createPdfKitDocument with getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledWith(getDocumentDefinition())
        })

        test('should call publish', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalled()
        })

        test('should call publish once', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalledTimes(1)
        })

        test('should call publish with mockPdfPrinter.createPdfKitDocument, request, TIMESTAMP_SYSTEM_TIME and type', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalledWith(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
        })

        test('should call saveOutboundStatement', async () => {
          await generateDocument(request, type)
          expect(saveOutboundStatement).toHaveBeenCalled()
        })

        test('should call saveOutboundStatement once', async () => {
          await generateDocument(request, type)
          expect(saveOutboundStatement).toHaveBeenCalledTimes(1)
        })

        test('should call saveOutboundStatement with correct parameters', async () => {
          const filename = await publish(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
          await generateDocument(request, type)
          expect(saveOutboundStatement).toHaveBeenCalledWith(request, filename, type)
        })
      })

      describe('When statement has been processed before', () => {
        beforeEach(() => {
          getGenerations.mockResolvedValue(true)
        })

        test('should call getGenerations', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalled()
        })

        test('should call getGenerations once', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledTimes(1)
        })

        test('should call getGenerations with request.documentReference', async () => {
          await generateDocument(request, type)
          expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
        })

        test('should not call getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).not.toHaveBeenCalled()
        })

        test('should not call mockPdfPrinter.createPdfKitDocument', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).not.toHaveBeenCalled()
        })

        test('should not call publish', async () => {
          await generateDocument(request, type)
          expect(publish).not.toHaveBeenCalled()
        })

        test('should not call saveOutboundStatement', async () => {
          await generateDocument(request, type)
          expect(saveOutboundStatement).not.toHaveBeenCalled()
        })
      })
    })
  })

  describe('When document is a delinked statement', () => {
    beforeEach(() => {
      publish.mockResolvedValue(MOCK_DELINKED_FILENAME)

      request = MOCK_DELINKEDSTATEMENT
      type = DELINKED
    })

    describe('When statement has not been processed before', () => {
      beforeEach(() => {
        getGenerations.mockResolvedValue(null)
      })

      test('should call getGenerations', async () => {
        await generateDocument(request, type)
        expect(getGenerations).toHaveBeenCalled()
      })

      test('should call getGenerations once', async () => {
        await generateDocument(request, type)
        expect(getGenerations).toHaveBeenCalledTimes(1)
      })

      test('should call getGenerations with request.documentReference', async () => {
        await generateDocument(request, type)
        expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
      })

      test('should call getDocumentDefinition', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).toHaveBeenCalled()
      })

      test('should call getDocumentDefinition once', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).toHaveBeenCalledTimes(1)
      })

      test('should call getDocumentDefinition with request and type', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).toHaveBeenCalledWith(request, type)
      })

      test('should call mockPdfPrinter.createPdfKitDocument', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalled()
      })

      test('should call mockPdfPrinter.createPdfKitDocument once', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledTimes(1)
      })

      test('should call mockPdfPrinter.createPdfKitDocument with getDocumentDefinition', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledWith(getDocumentDefinition())
      })

      test('should call publish', async () => {
        await generateDocument(request, type)
        expect(publish).toHaveBeenCalled()
      })

      test('should call publish once', async () => {
        await generateDocument(request, type)
        expect(publish).toHaveBeenCalledTimes(1)
      })

      test('should call publish with mockPdfPrinter.createPdfKitDocument, request, TIMESTAMP_SYSTEM_TIME and type', async () => {
        await generateDocument(request, type)
        expect(publish).toHaveBeenCalledWith(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
      })

      test('should call saveOutboundStatement', async () => {
        await generateDocument(request, type)
        expect(saveOutboundStatement).toHaveBeenCalled()
      })

      test('should call saveOutboundStatement once', async () => {
        await generateDocument(request, type)
        expect(saveOutboundStatement).toHaveBeenCalledTimes(1)
      })

      test('should call saveOutboundStatement with correct parameters', async () => {
        const filename = await publish(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
        await generateDocument(request, type)
        expect(saveOutboundStatement).toHaveBeenCalledWith(request, filename, type)
      })
    })

    describe('When statement has been processed before', () => {
      beforeEach(() => {
        getGenerations.mockResolvedValue(true)
      })

      test('should call getGenerations', async () => {
        await generateDocument(request, type)
        expect(getGenerations).toHaveBeenCalled()
      })

      test('should call getGenerations once', async () => {
        await generateDocument(request, type)
        expect(getGenerations).toHaveBeenCalledTimes(1)
      })

      test('should call getGenerations with request.documentReference', async () => {
        await generateDocument(request, type)
        expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
      })

      test('should not call getDocumentDefinition', async () => {
        await generateDocument(request, type)
        expect(getDocumentDefinition).not.toHaveBeenCalled()
      })

      test('should not call mockPdfPrinter.createPdfKitDocument', async () => {
        await generateDocument(request, type)
        expect(mockPdfPrinter().createPdfKitDocument).not.toHaveBeenCalled()
      })

      test('should not call publish', async () => {
        await generateDocument(request, type)
        expect(publish).not.toHaveBeenCalled()
      })

      test('should not call saveOutboundStatement', async () => {
        await generateDocument(request, type)
        expect(saveOutboundStatement).not.toHaveBeenCalled()
      })
    })
  })
})
