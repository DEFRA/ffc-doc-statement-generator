const PdfPrinter = require('pdfmake')
const moment = require('moment')

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

const FEATURES = {
  SEND_PUBLISH_MESSAGE: process.env.SEND_PUBLISH_MESSAGE === 'true',
  SEND_CRM_MESSAGE: process.env.SEND_CRM_MESSAGE === 'true',
  SAVE_LOG: process.env.SAVE_LOG === 'true'
}

const generateDocument = async (request, type) => {
  const existingDocument = await getGenerations(request.documentReference)

  if (existingDocument) {
    console.info(`Duplicate document received, skipping ${existingDocument.documentReference}`)
  } else {
    const docDefinition = getDocumentDefinition(request, type)
    const timestamp = new Date()
    const pdfDoc = printer.createPdfKitDocument(docDefinition)
    const filename = await publish(pdfDoc, request, moment(timestamp).format('YYYYMMDDHHmmssSS'), type)

    const isNoNotify = await getNoNotifyByAgreementNumber(request.scheme.agreementNumber)

    if (FEATURES.SEND_PUBLISH_MESSAGE && ((type.type === SFI23QUARTERLYSTATEMENT.type) || (type.type !== SCHEDULE.type && !isNoNotify))) {
      await sendPublishMessage(request, filename, type.id)
    }

    if (FEATURES.SEND_CRM_MESSAGE) {
      await sendCrmMessage(request, filename, type)
    }

    if (FEATURES.SAVE_LOG) {
      await saveLog(request, filename, timestamp)
    }
  }
}

module.exports = {
  generateDocument
}
