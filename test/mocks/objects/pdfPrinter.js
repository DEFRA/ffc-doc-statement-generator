const mockCreatePdfKitDocument = jest.fn()

const mockPdfPrinter = jest.fn().mockImplementation(() => {
  return {
    createPdfKitDocument: mockCreatePdfKitDocument
  }
})

jest.mock('pdfmake', () => {
  return mockPdfPrinter
})

module.exports = {
  mockPdfPrinter
}
