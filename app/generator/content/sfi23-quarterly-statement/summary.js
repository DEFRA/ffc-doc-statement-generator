const moment = require('moment')
const rpaLogo = require('../rpa-logo')
const getAddress = require('../get-address')

moment.locale('en-gb')

const summary = ({ businessName, address, sbi, transactionDate }) => {
  return {
    stack: [
      rpaLogo(),
      getAddress(businessName, address),
      { text: '', style: 'separator' },
      { text: [{ text: 'Single Business Identifier (SBI): ', bold: true, style: 'separator' }, `${sbi}`] },
      { text: [{ text: 'Business name: ', bold: true }, `${businessName}`] },
      { text: [{ text: 'Statement date: ', bold: true }, `${moment(transactionDate).format('LL')}`] }
    ],
    unbreakable: true
  }
}

module.exports = summary
