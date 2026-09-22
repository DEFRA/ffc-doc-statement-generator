const { outbox } = require('../database')

const saveOutboundStatement = async (generationId, type) => {
  await outbox().insert({
    generationId,
    type
  })
}

module.exports = {
  saveOutboundStatement
}
