const summary = require('./summary')
const part1 = require('./part1')
const part2 = require('./part2')
const part3 = require('./part3')
const getHelpInfo = require('./get-help-info')

const createContent = (sfi23QuarterlyStatement) => {
  const helpInfoBlock = ''
  return [
    summary(sfi23QuarterlyStatement),
    part1(sfi23QuarterlyStatement),
    part2(sfi23QuarterlyStatement),
    part3(sfi23QuarterlyStatement),
    getHelpInfo(helpInfoBlock)
  ]
}

module.exports = {
  createContent
}
