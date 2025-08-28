const util = require('util')
const config = require('../config')
const { SFI23QUARTERLYSTATEMENT, SCHEDULE, DELINKED } = require('../constants/document-types')

const { getPendingStatements } = require('./get-pending-statements')
const sendPublishMessage = require('../messaging/publish/send-publish-message')
const getNoNotifyByAgreementNumber = require('./get-no-notify-by-agreement-number')
const sendCrmMessage = require('./crm/send-crm-message')
const { setPublished } = require('./set-published')
const getGenerationById = require('./get-generation-by-id')

const delinked2024 = 2024

const isPublishEnabledForType = (type) => {
  return (type.type === SFI23QUARTERLYSTATEMENT.type && config.sfi23QuarterlyStatementEnabled) ||
    (type.type === SCHEDULE.type && config.scheduleEnabled) ||
    (type.type === DELINKED.type && config.delinkedGenerateStatementEnabled)
}

const isNotifyAllowed = async (request, type) => {
  if (type.type === DELINKED.type) {
    return true
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

const delinked2024Disabled = (request, type) => {
  return type.type === DELINKED.type && request.scheme.year === delinked2024 && !config.sendDelinked2024Statements
}

async function handleNotification (request, filename, type) {
  if (await shouldSendNotification(request, type) && !request.excludedFromNotify && !delinked2024Disabled(request, type)) {
    await sendPublishMessage(request, filename, type.id)
    console.info(`Publish message sent for document ${filename}`)
    return true
  }
  console.info(`Publish message not sent for document ${filename} - either not enabled or excluded from notify`)
  return false
}

async function handleAdditionalOperations (request, filename, type) {
  if (config.sendCrmMessageEnabled) {
    await sendCrmMessage(request, filename, type)
    console.info(`CRM message sent for document ${filename}`)
  } else {
    console.info(`CRM message not sent for document ${filename} - CRM messaging is disabled`)
  }
}

const publishStatements = async () => {
  const pendingStatements = await getPendingStatements()
  for (const pendingStatement of pendingStatements) {
    const { outboxId, generationId, type } = pendingStatement
    const { statementData, filename, documentReference } = await getGenerationById(generationId)
    statementData.documentReference = documentReference
    console.log('Identified statement for publishing:', util.inspect(statementData, false, null, true))
    const sentToPublisher = await handleNotification(statementData, filename, type)
    await handleAdditionalOperations(statementData, filename, type)
    await setPublished(outboxId, sentToPublisher)
    console.log('Statement finished publishing')
  }
}

module.exports = {
  publishStatements
}
