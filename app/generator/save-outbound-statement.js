const { outbox } = require('../data')

const saveOutboundStatement = async (generationId, type) => {
  await outbox().insert({
    generationId,
    type
  })
}

module.exports = {
  saveOutboundStatement
}
