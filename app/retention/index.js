const db = require('../data')
const { DELINKED } = require('../constants/scheme-ids')
const { removeGenerations } = require('./remove-generations')
const { removeNoNotifys } = require('./remove-no-notifys')
const { removeOutbox } = require('./remove-outbox')
const { findGenerations } = require('./find-generations')
const sendRetentionMessages = require('../messaging/publish/send-retention-messages')

const removeAgreementData = async (retentionData) => {
  const transaction = await db.sequelize.transaction()
  try {
    const { simplifiedAgreementNumber, frn, schemeId } = retentionData

    if (schemeId !== DELINKED) {
      await transaction.commit()
      return
    }

    await removeNoNotifys(simplifiedAgreementNumber, frn, transaction)

    const generations = await findGenerations(simplifiedAgreementNumber, frn, transaction)
    const generationIds = generations.map(g => g.generationId)
    if (generations.length === 0) {
      await transaction.commit()
      return
    }

    await removeOutbox(generationIds, transaction)
    await removeGenerations(generationIds, transaction)

    await sendRetentionMessages(generations)
    await transaction.commit()
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

module.exports = {
  removeAgreementData
}
