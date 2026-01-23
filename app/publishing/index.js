const config = require('../config')
const { publishStatements } = require('./publish-statements')
const { isWithinWindow, isPollDay } = require('./window-helpers')

const start = async () => {
  try {
    const inWindow = isWithinWindow(config.pollWindow)
    const onDay = isPollDay(config.pollWindow.days)
    if (inWindow && onDay) {
      await publishStatements()
    }
  } catch (err) {
    console.error(err)
  } finally {
    setTimeout(start, config.publishingFrequency)
  }
}

module.exports = {
  start
}
