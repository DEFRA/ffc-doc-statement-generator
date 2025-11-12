const { getOutboundBlobClient } = require('../../../app/storage')
const createFilename = require('../../../app/generator/create-filename')
const publish = require('../../../app/generator/publish')

jest.mock('../../../app/storage')
jest.mock('../../../app/generator/create-filename')

describe('publish', () => {
  let mockPdfDoc
  let mockStatement
  let mockTimestamp
  let mockType
  let mockFilename
  let mockBlobClient

  const chunk = Buffer.from('testChunk')

  beforeEach(() => {
    mockPdfDoc = { on: jest.fn(), end: jest.fn() }
    mockStatement = {}
    mockTimestamp = Date.now()
    mockType = 'testType'
    mockFilename = 'testFilename.pdf'
    mockBlobClient = { upload: jest.fn() }

    createFilename.mockReturnValue(mockFilename)
    getOutboundBlobClient.mockResolvedValue(mockBlobClient)
  })

  const mockPdfEvents = (events) => {
    mockPdfDoc.on.mockImplementation((event, callback) => {
      if (events[event]) events[event](callback)
    })
  }

  test('resolves with filename on successful publish', async () => {
    mockPdfEvents({
      data: (cb) => cb(chunk),
      end: (cb) => cb()
    })

    const result = await publish(mockPdfDoc, mockStatement, mockTimestamp, mockType)

    expect(result).toBe(mockFilename)
    expect(createFilename).toHaveBeenCalledWith(mockStatement, mockTimestamp, mockType)
    expect(getOutboundBlobClient).toHaveBeenCalledWith(mockFilename)
    expect(mockBlobClient.upload).toHaveBeenCalledWith(chunk, chunk.length)
  })

  describe('rejects with errors', () => {
    const errorCases = [
      ['pdfDoc emits error', { error: (cb) => cb(new Error('pdfError')) }, 'pdfError'],
      ['pdfDoc emits non-error value', { error: (cb) => cb(new Error('pdfError')) }, 'pdfError'],
      ['uploadToStorage throws error in end',
        { data: (cb) => cb(chunk), end: (cb) => cb() },
        'uploadError',
        () => { mockBlobClient.upload.mockImplementation(() => { throw new Error('uploadError') }) }
      ],
      ['uploadToStorage throws non-error value',
        { data: (cb) => cb(chunk), end: (cb) => cb() },
        'uploadError',
        () => { mockBlobClient.upload.mockImplementation(() => { throw new Error('uploadError') }) }
      ],
      ['getOutboundBlobClient rejects',
        { data: (cb) => cb(chunk), end: (cb) => cb() },
        'blobClientError',
        () => { getOutboundBlobClient.mockRejectedValue(new Error('blobClientError')) }
      ],
      ['pdfDoc emits error after data',
        { data: (cb) => cb(chunk), error: (cb) => cb(new Error('pdfError')) },
        'pdfError'
      ],
      ['pdfDoc emits error after end',
        { end: (cb) => cb(), error: (cb) => cb(new Error('pdfError')) },
        'pdfError'
      ]
    ]

    test.each(errorCases)('%s', async (_, events, expectedMessage, extraSetup) => {
      if (extraSetup) extraSetup()
      mockPdfEvents(events)
      await expect(publish(mockPdfDoc, mockStatement, mockTimestamp, mockType)).rejects.toThrow(expectedMessage)
    })
  })
})
