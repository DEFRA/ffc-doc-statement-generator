const PdfPrinter = require('pdfmake')
const moment = require('moment')

const config = require('../config')

const { SCHEDULE } = require('../constants/document-types')

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

    if (type.type === SCHEDULE.type) {
      if (config.schedulesArePublished) {
        await sendPublishMessage(request, filename, type.id)
      }
    } else {
      const isNoNotify = await getNoNotifyByAgreementNumber(request.scheme.agreementNumber)
      if (!isNoNotify) {
        await sendPublishMessage(request, filename, type.id)
      }
    }

    await sendCrmMessage(request, filename, type)
    await saveLog(request, filename, timestamp)
  }
}

module.exports = {
  generateDocument
}
