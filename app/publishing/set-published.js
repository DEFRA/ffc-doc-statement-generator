const { outbox } = require('../database')

const setPublished = async (outboxId, sentToPublisher, sentToCRM, receiverLink) => {
  await outbox()
    .where({ outboxId })
    .update({
      published: new Date(),
      sentToPublisher,
      sentToCRM,
      receiverLink
    })
}

module.exports = {
  setPublished
}
