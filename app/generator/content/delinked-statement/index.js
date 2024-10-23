const summary = require('./summary')
const part1 = require('./part1')
const part2 = require('./part2')
const part3 = require('./part3')
const part4 = require('./part4')
const delinkedHelpInfo = require('../delinked-help-info')

const createContent = (delinkedStatement) => {
  return [
    summary(delinkedStatement),
    part1(delinkedStatement),
    part2(delinkedStatement),
    part3(delinkedStatement),
    part4(delinkedStatement),
    delinkedHelpInfo(delinkedStatement)
  ]
}

module.exports = {
  createContent
}
