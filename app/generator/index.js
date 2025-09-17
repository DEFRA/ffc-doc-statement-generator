const PdfPrinter = require('pdfmake')
const moment = require('moment')

const getGenerations = require('./get-generations')
const getDocumentDefinition = require('./get-document-definition')
const publish = require('./publish')

const fonts = require('./fonts')
const { saveOutboundStatement } = require('./save-outbound-statement')
const saveLog = require('./save-log')
const printer = new PdfPrinter(fonts)

const generateDocument = async (request, type) => {
  const existingDocument = await getGenerations(request.documentReference)
  if (existingDocument) {
    console.info(`Duplicate document received, skipping ${existingDocument.documentReference}`)
    return
  }

  const filename = await createAndPublishDocument(request, type)

  const { generationId } = await saveLog(request, filename, new Date())
  console.info(`Log saved for document ${filename}`)

  await saveOutboundStatement(generationId, type)
}

async function createAndPublishDocument (request, type) {
  const docDefinition = await getDocumentDefinition(request, type)
  const timestamp = new Date()
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  pdfDoc.end()
  const filename = await publish(pdfDoc, request, moment(timestamp).format('YYYYMMDDHHmmssSS'), type)
  console.info(`Document published to blob storage: ${filename}`)
  return filename
}

module.exports = {
  generateDocument
}
