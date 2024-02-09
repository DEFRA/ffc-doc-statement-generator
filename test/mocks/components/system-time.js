const moment = require('moment')

module.exports = {
  DATE: new Date(2022, 7, 5, 15, 30, 0, 0),
  TIMESTAMP: moment(new Date(2022, 7, 5, 15, 30, 0, 0)).format('YYYYMMDDHHmmssSS')
}
