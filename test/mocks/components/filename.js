const moment = require('moment')

const { DATE } = require('./system-time')

const MOCK_SFI23QUARTERLYSTATEMENT = require('../mock-statement-sfi23-quarterly')
const MOCK_DELINKEDSTATEMENT = require('../mock-delinked-statement')

module.exports = {
  SFI23QUARTERLYSTATEMENT: `FFC_PaymentStatement_${MOCK_SFI23QUARTERLYSTATEMENT.scheme.shortName}_${MOCK_SFI23QUARTERLYSTATEMENT.scheme.year}_${MOCK_SFI23QUARTERLYSTATEMENT.frn}_${moment(DATE).format('YYYYMMDDHHmmssSS')}.pdf`.replace(/\s/g, ''),
  DELINKEDSTATEMENT: `FFC_PaymentStatement_${MOCK_DELINKEDSTATEMENT.scheme.shortName}_${MOCK_DELINKEDSTATEMENT.scheme.year}_${MOCK_DELINKEDSTATEMENT.frn}_${moment(DATE).format('YYYYMMDDHHmmssSS')}.pdf`.replace(/\s/g, ''),
  SFI23QUARTERLYSTATEMENT_EARLIER: `FFC_PaymentStatement_${MOCK_SFI23QUARTERLYSTATEMENT.scheme.shortName}_${MOCK_SFI23QUARTERLYSTATEMENT.scheme.year}_${MOCK_SFI23QUARTERLYSTATEMENT.frn}_${moment(DATE).subtract(1, 'days').format('YYYYMMDDHHmmssSS')}.pdf`.replace(/\s/g, '')
}
