const getLevelPriority = require('./get-level-priority')
const sortArray = require('./sort-array')

const orderFunding = (fundings) => {
  return fundings
    .map(x => ({ ...x, levelPriority: getLevelPriority(x.level) }))
    .sort((x, y) => { return sortArray(x.name, y.name) || sortArray(x.levelPriority, y.levelPriority) })
}

module.exports = orderFunding
