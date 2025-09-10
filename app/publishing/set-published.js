const db = require('../data')

const setPublished = async (outboxId, sentToPublisher, sentToCRM, receiverLink) => {
  await db.outbox.update({
    published: new Date(),
    sentToPublisher,
    sentToCRM,
    receiverLink
  }, {
    where: {
      outboxId
    }
  })
}

module.exports = {
  setPublished
}
