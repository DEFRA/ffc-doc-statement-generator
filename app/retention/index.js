const db = require('../data')
const { DELINKED } = require('../constants/scheme-ids')
const { removeGenerations } = require('./remove-generations')
const { removeNoNotifys } = require('./remove-no-notifys')
const { removeOutbox } = require('./remove-outbox')
const { findGenerations } = require('./find-generations')
const sendRetentionMessages = require('../messaging/publish/send-retention-messages')

const removeAgreementData = async (retentionData) => {
  const { simplifiedAgreementNumber, frn, schemeId } = retentionData

  if (schemeId !== DELINKED) {
    return
  }

  await db.transaction(async (trx) => {
    await removeNoNotifys(trx, simplifiedAgreementNumber, frn)

    const generations = await findGenerations(trx, simplifiedAgreementNumber, frn)
    if (generations.length === 0) {
      return
    }

    const generationIds = generations.map(g => g.generationId)
    await removeOutbox(trx, generationIds)
    await removeGenerations(trx, generationIds)

    await sendRetentionMessages(generations)
  })
}

module.exports = {
  removeAgreementData
}
