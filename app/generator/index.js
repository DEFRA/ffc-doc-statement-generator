const PdfPrinter = require('pdfmake')
const moment = require('moment')
const config = require('../config')

const { SFI23QUARTERLYSTATEMENT, SCHEDULE, DELINKED } = require('../constants/document-types')

const getGenerations = require('./get-generations')
const getDocumentDefinition = require('./get-document-definition')
const publish = require('./publish')
const sendPublishMessage = require('../messaging/publish/send-publish-message')
const sendCrmMessage = require('../messaging/crm/send-crm-message')
const saveLog = require('./save-log')
const getNoNotifyByAgreementNumber = require('./get-no-notify-by-agreement-number')

const fonts = require('./fonts')
const printer = new PdfPrinter(fonts)

const delinked2024 = 2024

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
  const filename = await publish(pdfDoc, request, moment(timestamp).format('YYYYMMDDHHmmssSS'), type)
  console.info(`Document published: ${filename}`)
  return filename
}

const isPublishEnabledForType = (type) => {
  return (type.type === SFI23QUARTERLYSTATEMENT.type && config.sfi23QuarterlyStatementEnabled) ||
         (type.type === SCHEDULE.type && config.scheduleEnabled) ||
         (type.type === DELINKED.type && config.delinkedGenerateStatementEnabled)
}

const isNotifyAllowed = async (request, type) => {
  if (type.type === DELINKED.type) {
    return request.scheme.year !== delinked2024 || config.sendDelinked2024Statements
  }
  const noNotify = await getNoNotifyByAgreementNumber(request.scheme.agreementNumber)
  return type.type !== SFI23QUARTERLYSTATEMENT.type &&
           type.type !== SCHEDULE.type &&
           !noNotify
}

async function shouldSendNotification (request, type) {
  const publishEnabled = isPublishEnabledForType(type)
  const notifyAllowed = await isNotifyAllowed(request, type)
  return publishEnabled || notifyAllowed
}

async function handleNotification (request, filename, type) {
  if (await shouldSendNotification(request, type) && !request.excludedFromNotify) {
    await sendPublishMessage(request, filename, type.id)
    console.info(`Publish message sent for document ${filename}`)
  }
}

async function handleAdditionalOperations (request, filename, type) {
  if (config.sendCrmMessageEnabled) {
    await sendCrmMessage(request, filename, type)
  }
  if (config.saveLogEnabled) {
    await saveLog(request, filename, new Date())
    console.info(`Log saved for document ${filename}`)
  }
}

module.exports = {
  generateDocument
}
