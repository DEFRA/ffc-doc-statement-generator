const db = require('../data')

const removeNoNotifys = async (agreementNumber, frn, transaction) => {
  await db.noNotify.destroy({
    where: { agreementNumber, frn },
    transaction
  })
}

module.exports = {
  removeNoNotifys
}
