const summary = require('../summary')
const delinkedIntroduction = require('./delinked-introduction')
const paymentSummary = require('./payment-summary')
const prCalculations = require('./pr-calculations')
const paymentCalculations = require('./paymentCalculations')
const delinkedHelpInfo = require('./delinked-help-info')

const createContent = (delinkedStatement) => {
  return [
    summary(delinkedStatement),
    delinkedIntroduction(delinkedStatement),
    paymentSummary(delinkedStatement),
    prCalculations(delinkedStatement),
    paymentCalculations(delinkedStatement),
    delinkedHelpInfo(delinkedStatement)
  ]
}

module.exports = {
  createContent
}
