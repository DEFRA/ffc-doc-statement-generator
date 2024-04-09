const PdfPrinter = require('pdfmake')
const moment = require('moment')

const { SFI23QUARTERLYSTATEMENT } = require('../constants/document-types')
// const { STATEMENT, SCHEDULE } = require('../constants/document-types')

const getGenerations = require('./get-generations')
const getDocumentDefinition = require('./get-document-definition')
const publish = require('./publish')
const sendPublishMessage = require('../messaging/publish/send-publish-message')
const sendCrmMessage = require('../messaging/crm/send-crm-message')
const saveLog = require('./save-log')

const fonts = require('./fonts')
const printer = new PdfPrinter(fonts)

const generateDocument = async (request, type) => {
  const existingDocument = await getGenerations(request.documentReference)

  if (existingDocument) {
    console.info(`Duplicate document received, skipping ${existingDocument.documentReference}`)
  } else {
    const docDefinition = getDocumentDefinition(request, type)
    const timestamp = new Date()
    const pdfDoc = printer.createPdfKitDocument(docDefinition)
    const filename = await publish(pdfDoc, request, moment(timestamp).format('YYYYMMDDHHmmssSS'), type)

    switch (type.type) {
      case SFI23QUARTERLYSTATEMENT.type:
        await sendPublishMessage(request, filename, type.id)
        break
      // case STATEMENT.type:
      //   await sendPublishMessage(request, filename, type.id)
      //   break
      // case SCHEDULE.type:
      //   await sendPublishMessage(request, filename, type.id)
      //   break
      // default:
      //   break
    }
    // if (type.type === SFI23QUARTERLYSTATEMENT.type) {
    //   await sendPublishMessage(request, filename, type.id)
    // }
    // if (type.type === STATEMENT.type) {
    //   await sendPublishMessage(request, filename, type.id)
    // }
    // if (type.type === SCHEDULE.type) {
    //   await sendPublishMessage(request, filename, type.id)
    // }

    await sendCrmMessage(request, filename, type)
    await saveLog(request, filename, timestamp)
  }
}

module.exports = {
  generateDocument
}
