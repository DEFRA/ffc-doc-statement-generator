const { noNotifys } = require('../database')

const removeNoNotifys = async (queryable, agreementNumber, frn) => {
  await noNotifys(queryable)
    .where({ agreementNumber, frn })
    .del()
}

module.exports = {
  removeNoNotifys
}
