const summary = require('../summary')
const part1 = require('./part1')
const part2 = require('./part2')
const part3 = require('./part3')
const getHelpInfo = require('../get-help-info')

const createContent = (schedule) => {
  const helpInfoBlock = ''
  return [
    summary(schedule),
    part1(schedule),
    part2(schedule),
    part3(schedule),
    getHelpInfo(helpInfoBlock)
  ]
}

module.exports = {
  createContent
}
