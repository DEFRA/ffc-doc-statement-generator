const db = require('../data')

const setPublished = async (outboxId, sentToPublisher) => {
  await db.outbox.update({
    published: new Date(),
    sentToPublisher
  }, {
    where: {
      outboxId
    }
  })
}

module.exports = {
  setPublished
}
