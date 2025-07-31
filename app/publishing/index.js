const config = require('../config')
const { publishStatements } = require('./publish-statements')

const start = async () => {
  try {
    await publishStatements()
  } catch (err) {
    console.error(err)
  } finally {
    setTimeout(start, config.publishingFrequency)
  }
}

module.exports = {
  start
}
