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
    return
  }

  const filename = await createAndPublishDocument(request, type)
  await handleNotification(request, filename, type)
  await handleAdditionalOperations(request, filename, type)
}

async function createAndPublishDocument (request, type) {
  const docDefinition = getDocumentDefinition(request, type)
  const timestamp = new Date()
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  return await publish(pdfDoc, request, moment(timestamp).format('YYYYMMDDHHmmssSS'), type)
}

async function shouldSendNotification (request, type) {
  const isPublishEnabledForType = (type.type === SFI23QUARTERLYSTATEMENT.type && config.SFI23QUARTERLYSTATEMENT_ENABLED === 'true') || (type.type === SCHEDULE.type && config.SCHEDULE_ENABLED === 'true')
  const isNotifyAllowed = type.type !== SFI23QUARTERLYSTATEMENT.type && type.type !== SCHEDULE.type && !(await getNoNotifyByAgreementNumber(request.scheme.agreementNumber))
  return isPublishEnabledForType || isNotifyAllowed
}

async function handleNotification (request, filename, type) {
  if (await shouldSendNotification(request, type)) {
    await sendPublishMessage(request, filename, type.id)
  }
}

async function handleAdditionalOperations (request, filename, type) {
  if (config.SEND_CRM_MESSAGE_ENABLED === 'true') {
    await sendCrmMessage(request, filename, type)
  }
  if (config.SAVE_LOG_ENABLED === 'true') {
    await saveLog(request, filename, new Date())
  }
}

module.exports = {
  generateDocument
}
