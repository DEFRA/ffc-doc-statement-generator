const PdfPrinter = require('pdfmake')
const moment = require('moment')
const config = require('../config')

const { SFI23QUARTERLYSTATEMENT, SCHEDULE } = require('../constants/document-types')

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

    if (type.type === SFI23QUARTERLYSTATEMENT.type && config.SFI23QUARTERLYSTATEMENT_ENABLED === 'true') {
      await sendPublishMessage(request, filename, type.id)
    } else if (type.type === SCHEDULE.type && config.SCHEDULE_ENABLED === 'true') {
      await sendPublishMessage(request, filename, type.id)
    } else if (type.type !== SFI23QUARTERLYSTATEMENT.type && type.type !== SCHEDULE.type) {
      const isNoNotify = await getNoNotifyByAgreementNumber(request.scheme.agreementNumber)
      if (!isNoNotify) {
        await sendPublishMessage(request, filename, type.id)
      }
    }

    // Conditional CRM message and log saving, assuming these are also feature-toggled
    if (config.SEND_CRM_MESSAGE_ENABLED === 'true') {
      await sendCrmMessage(request, filename, type)
    }
    if (config.SAVE_LOG_ENABLED === 'true') {
      await saveLog(request, filename, timestamp)
    }
  }
}

module.exports = {
  generateDocument
}
