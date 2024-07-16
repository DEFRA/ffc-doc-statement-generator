const PdfPrinter = require('pdfmake')
const moment = require('moment')
const config = require('../config')

const getGenerations = require('./get-generations')
const getDocumentDefinition = require('./get-document-definition')
const publish = require('./publish')
const sendPublishMessage = require('../messaging/publish/send-publish-message')
const sendCrmMessage = require('../messaging/crm/send-crm-message')
const saveLog = require('./save-log')
const getNoNotifyByAgreementNumber = require('./get-no-notify-by-agreement-number')

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

    // Simplified shouldSendPublishMessage determination
    const shouldSendPublishMessage = (type.type === 'SFI23QUARTERLYSTATEMENT' && config.SFI23QUARTERLYSTATEMENT_ENABLED === 'true') ||
                                      (type.type === 'SCHEDULE' && config.SCHEDULE_ENABLED === 'true' && config.schedulesArePublished) ||
                                      !(await getNoNotifyByAgreementNumber(request.scheme.agreementNumber))

    if (shouldSendPublishMessage) {
      await sendPublishMessage(request, filename, type.id)
    }

    // Check if CRM message sending is enabled
    if (config.SEND_CRM_MESSAGE_ENABLED === 'true') {
      await sendCrmMessage(request, filename, type)
    }
    // Check if log saving is enabled
    if (config.SAVE_LOG_ENABLED === 'true') {
      await saveLog(request, filename, timestamp)
    }
  }
}

module.exports = {
  generateDocument
}
