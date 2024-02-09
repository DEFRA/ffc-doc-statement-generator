const moment = require('moment')

const { DATE } = require('./system-time')

const { topUpSchedule: MOCK_SCHEDULE } = require('../mock-schedule')
const MOCK_STATEMENT = require('../mock-statement')

module.exports = {
  SCHEDULE: `FFC_PaymentSchedule_${MOCK_SCHEDULE.scheme.shortName}_${MOCK_SCHEDULE.scheme.year}_${MOCK_SCHEDULE.frn}_${moment(DATE).format('YYYYMMDDHHmmssSS')}.pdf`.replace(/\s/g, ''),
  SCHEDULE_EARLIER: `FFC_PaymentSchedule_${MOCK_SCHEDULE.scheme.shortName}_${MOCK_SCHEDULE.scheme.year}_${MOCK_SCHEDULE.frn}_${moment(DATE).subtract(1, 'days').format('YYYYMMDDHHmmssSS')}.pdf`.replace(/\s/g, ''),
  STATEMENT: `FFC_PaymentStatement_${MOCK_STATEMENT.scheme.shortName}_${MOCK_STATEMENT.scheme.year}_${MOCK_STATEMENT.frn}_${moment(DATE).format('YYYYMMDDHHmmssSS')}.pdf`.replace(/\s/g, ''),
  STATEMENT_EARLIER: `FFC_PaymentStatement_${MOCK_STATEMENT.scheme.shortName}_${MOCK_STATEMENT.scheme.year}_${MOCK_STATEMENT.frn}_${moment(DATE).subtract(1, 'days').format('YYYYMMDDHHmmssSS')}.pdf`.replace(/\s/g, '')
}
