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

  beforeEach(() => {
    mockPdfDoc = {
      on: jest.fn(),
      end: jest.fn()
    }
    mockStatement = {}
    mockTimestamp = Date.now()
    mockType = 'testType'
    mockFilename = 'testFilename.pdf'
    mockBlobClient = {
      upload: jest.fn()
    }

    createFilename.mockReturnValue(mockFilename)
    getOutboundBlobClient.mockResolvedValue(mockBlobClient)
  })

  test('should resolve with filename on successful publish', async () => {
    mockPdfDoc.on.mockImplementation((event, callback) => {
      if (event === 'data') {
        callback(Buffer.from('testChunk'))
      } else if (event === 'end') {
        callback()
      }
    })

    const result = await publish(mockPdfDoc, mockStatement, mockTimestamp, mockType)

    expect(result).toBe(mockFilename)
    expect(createFilename).toHaveBeenCalledWith(mockStatement, mockTimestamp, mockType)
    expect(getOutboundBlobClient).toHaveBeenCalledWith(mockFilename)
    expect(mockBlobClient.upload).toHaveBeenCalledWith(Buffer.from('testChunk'), Buffer.from('testChunk').length)
  })

  test('should reject with error on pdfDoc error', async () => {
    const mockError = new Error('testError')
    mockPdfDoc.on.mockImplementation((event, callback) => {
      if (event === 'error') {
        callback(mockError)
      }
    })

    await expect(publish(mockPdfDoc, mockStatement, mockTimestamp, mockType)).rejects.toThrow('testError')
  })

  test('should reject with error on uploadToStorage error', async () => {
    const mockError = new Error('uploadError')
    mockPdfDoc.on.mockImplementation((event, callback) => {
      if (event === 'data') {
        callback(Buffer.from('testChunk'))
      } else if (event === 'end') {
        callback()
      }
    })
    mockBlobClient.upload.mockRejectedValue(mockError)

    await expect(publish(mockPdfDoc, mockStatement, mockTimestamp, mockType)).rejects.toThrow('uploadError')
  })
})
