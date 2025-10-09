const util = require('util')
const config = require('../config')
const { SFI23QUARTERLYSTATEMENT, DELINKED } = require('../constants/document-types')

const { getPendingStatements } = require('./get-pending-statements')
const sendPublishMessage = require('../messaging/publish/send-publish-message')
const getNoNotifyByAgreementNumber = require('./get-no-notify-by-agreement-number')
const sendCrmMessage = require('./crm/send-crm-message')
const { setPublished } = require('./set-published')
const getGenerationById = require('./get-generation-by-id')

const isPublishEnabledForType = (type) => {
  return (type.type === SFI23QUARTERLYSTATEMENT.type && config.sfi23QuarterlyStatementEnabled) ||
    (type.type === DELINKED.type && config.delinkedGenerateStatementEnabled)
}

const isNotifyAllowed = async (request, type) => {
  if (type.type === DELINKED.type) {
    return true
  }
  const noNotify = await getNoNotifyByAgreementNumber(request.scheme.agreementNumber)
  return type.type !== SFI23QUARTERLYSTATEMENT.type &&
    !noNotify
}

async function shouldSendNotification (request, type) {
  const publishEnabled = isPublishEnabledForType(type)
  const notifyAllowed = await isNotifyAllowed(request, type)
  return publishEnabled || notifyAllowed
}

const handleNotification = async (request, filename, type) => {
  if (await shouldSendNotification(request, type) && !request.excludedFromNotify) {
    await sendPublishMessage(request, filename, type.id)
    console.info(`Publish message sent for document ${filename}`)
    return true
  }
  console.info(`Publish message not sent for document ${filename} - either not enabled or excluded from notify`)
  return false
}

const handleCRM = async (request, filename, type) => {
  if (config.sendCrmMessageEnabled) {
    const receiverLink = await sendCrmMessage(request, filename, type)
    console.info(`CRM message sent for document ${filename}`)
    return { sentToCRM: true, receiverLink }
  }
  console.info(`CRM message not sent for document ${filename} - CRM messaging is disabled`)
  return { sentToCRM: false, receiverLink: null }
}

const publishStatements = async () => {
  const pendingStatements = await getPendingStatements()
  for (const pendingStatement of pendingStatements) {
    const { outboxId, generationId, type } = pendingStatement
    const { statementData, filename, documentReference } = await getGenerationById(generationId)
    statementData.documentReference = documentReference
    console.log('Identified statement for publishing:', util.inspect(statementData, false, null, true))
    const sentToPublisher = await handleNotification(statementData, filename, type)
    const { sentToCRM, receiverLink } = await handleCRM(statementData, filename, type)
    await setPublished(outboxId, sentToPublisher, sentToCRM, receiverLink)
    console.log('Statement finished publishing')
  }
}

module.exports = {
  publishStatements
}
