const db = require('../data')

const saveOutboundStatement = async (generationId, type) => {
  await db.outbox.create({
    generationId,
    type
  })
}

module.exports = {
  saveOutboundStatement
}
