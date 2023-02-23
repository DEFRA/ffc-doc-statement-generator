const summary = require('./summary')
const part1 = require('./part1')
const part2 = require('./part2')
const part3 = require('./part3')

const createContent = (statement) => {
  return [
    summary(statement),
    part1(statement),
    part2(statement),
    part3()
  ]
}

module.exports = createContent
