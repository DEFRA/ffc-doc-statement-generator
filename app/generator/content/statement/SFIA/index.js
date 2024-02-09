const advanceSummary = require('../SFIA/content/advance-summary')
const content = require('./content')
const advancePaymentHelp = require('../../advance-payment-help')
const dataProtection = require('../../data-protection')
const createContent = (statement) => {
  return [
    advanceSummary(statement),
    content(statement),
    advancePaymentHelp(),
    dataProtection()
  ]
}

module.exports = {
  createContent
}
