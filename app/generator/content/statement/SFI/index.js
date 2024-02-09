const summary = require('../../summary')
const part1 = require('./part1')
const part2 = require('./part2')
const part3 = require('./part3')
const getHelpInfo = require('../../get-help-info')

const createContent = (statement) => {
  const helpInfoBlock = 'Part 3. '
  return [
    summary(statement),
    part1(statement),
    part2(statement),
    part3(statement),
    getHelpInfo(helpInfoBlock)
  ]
}

module.exports = {
  createContent
}
