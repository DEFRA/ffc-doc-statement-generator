const config = require('../../../app/config')
const { SFI23QUARTERLYSTATEMENT, DELINKED } = require('../../../app/constants/document-types')
const { DATE: SYSTEM_TIME, TIMESTAMP: TIMESTAMP_SYSTEM_TIME } = require('../../mocks/components/system-time')
const MOCK_SFI23QUARTERLYSTATEMENT = require('../../mocks/mock-statement-sfi23-quarterly')
const MOCK_DELINKEDSTATEMENT = require('../../mocks/mock-delinked-statement')
const { SFI23QUARTERLYSTATEMENT: MOCK_SFI23QUARTERLYSTATEMENT_FILENAME, DELINKEDSTATEMENT: MOCK_DELINKED_FILENAME } = require('../../mocks/components/filename')
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

describe('generateDocument', () => {
  let consoleInfoSpy

  beforeEach(() => {
    config.sfi23QuarterlyStatementEnabled = true
    jest.useFakeTimers().setSystemTime(SYSTEM_TIME)
    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
    getDocumentDefinition.mockReturnValue('docDef')
  })

  afterEach(() => {
    delete config.sfi23QuarterlyStatementEnabled
    consoleInfoSpy.mockRestore()
    jest.clearAllMocks()
  })

  const documentScenarios = [
    {
      name: 'SFI23QUARTERLYSTATEMENT',
      type: SFI23QUARTERLYSTATEMENT,
      request: MOCK_SFI23QUARTERLYSTATEMENT,
      filename: MOCK_SFI23QUARTERLYSTATEMENT_FILENAME
    },
    {
      name: 'DELINKED',
      type: DELINKED,
      request: MOCK_DELINKEDSTATEMENT,
      filename: MOCK_DELINKED_FILENAME
    }
  ]

  describe.each(documentScenarios)('$name document', ({ type, request, filename }) => {
    describe.each([
      { processedBefore: false, generationsReturn: null },
      { processedBefore: true, generationsReturn: true }
    ])('when processedBefore=$processedBefore', ({ processedBefore, generationsReturn }) => {
      beforeEach(() => {
        getGenerations.mockResolvedValue(generationsReturn)
        publish.mockResolvedValue(filename)
      })

      test('calls getGenerations correctly', async () => {
        await generateDocument(request, type)
        expect(getGenerations).toHaveBeenCalledTimes(1)
        expect(getGenerations).toHaveBeenCalledWith(request.documentReference)
      })

      if (!processedBefore) {
        test('calls getDocumentDefinition', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).toHaveBeenCalledTimes(1)
          expect(getDocumentDefinition).toHaveBeenCalledWith(request, type)
        })

        test('calls PDF printer correctly', async () => {
          await generateDocument(request, type)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledTimes(1)
          expect(mockPdfPrinter().createPdfKitDocument).toHaveBeenCalledWith(getDocumentDefinition())
        })

        test('calls publish with correct arguments', async () => {
          await generateDocument(request, type)
          expect(publish).toHaveBeenCalledTimes(1)
          expect(publish).toHaveBeenCalledWith(mockPdfPrinter().createPdfKitDocument(), request, TIMESTAMP_SYSTEM_TIME, type)
        })

        test('calls saveOutboundStatement', async () => {
          await generateDocument(request, type)
          expect(saveOutboundStatement).toHaveBeenCalledTimes(1)
        })

        test('logs publishing info', async () => {
          await generateDocument(request, type)
          expect(console.info).toHaveBeenCalledWith(`Document published to blob storage: ${filename}`)
        })
      } else {
        test('does not call getDocumentDefinition, PDF printer, publish or saveOutboundStatement', async () => {
          await generateDocument(request, type)
          expect(getDocumentDefinition).not.toHaveBeenCalled()
          expect(mockPdfPrinter().createPdfKitDocument).not.toHaveBeenCalled()
          expect(publish).not.toHaveBeenCalled()
          expect(saveOutboundStatement).not.toHaveBeenCalled()
        })
      }
    })
  })
})
