const PdfPrinter = require('pdfmake')
const moment = require('moment')

const getGenerations = require('./get-generations')
const getDocumentDefinition = require('./get-document-definition')
const publish = require('./publish')

const fonts = require('./fonts')
const { saveOutboundStatement } = require('./save-outbound-statement')
const printer = new PdfPrinter(fonts)

const generateDocument = async (request, type) => {
  const existingDocument = await getGenerations(request.documentReference)
  if (existingDocument) {
    console.info(`Duplicate document received, skipping ${existingDocument.documentReference}`)
    return
  }

  const filename = await createAndPublishDocument(request, type)
  await saveOutboundStatement(request, filename, type)
}

async function createAndPublishDocument(request, type) {
  const docDefinition = getDocumentDefinition(request, type)
  const timestamp = new Date()
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  const filename = await publish(pdfDoc, request, moment(timestamp).format('YYYYMMDDHHmmssSS'), type)
  console.info(`Document published: ${filename}`)
  return filename
}

module.exports = {
  generateDocument
}
