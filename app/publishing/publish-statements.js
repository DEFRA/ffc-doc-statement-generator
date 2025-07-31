const util = require('util')
const config = require('../config')
const { SFI23QUARTERLYSTATEMENT, SCHEDULE, DELINKED } = require('../constants/document-types')

const { getPendingStatements } = require('./get-pending-statements')
const sendPublishMessage = require('../messaging/publish/send-publish-message')
const getNoNotifyByAgreementNumber = require('./get-no-notify-by-agreement-number')
const sendCrmMessage = require('./crm/send-crm-message')
const saveLog = require('./save-log')
const { setPublished } = require('./set-published')

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
  return false
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

const publishStatements = async () => {
  const pendingStatements = await getPendingStatements()
  for (const pendingStatement of pendingStatements) {
    const { publishedStatementId, statement, type, filename } = pendingStatement
    console.log('Identified statement for publishing:', util.inspect(statement, false, null, true))
    const published = await handleNotification(statement, filename, type)
    await handleAdditionalOperations(statement, filename, type)
    await setPublished(publishedStatementId, published)
    console.log('Statement finished publishing')
  }
}

module.exports = {
  publishStatements
}
