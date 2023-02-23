const generateStatement = require('../generator')
const util = require('util')
const validateStatement = require('./validate-statement')
const { VALIDATION } = require('../errors')

const processStatementMessage = async (message, receiver) => {
  try {
    const statement = message.body
    console.log('Statement received:', util.inspect(statement, false, null, true))
    validateStatement(statement)
    await generateStatement(statement)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process statement:', err)
    if (err.category === VALIDATION) {
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = processStatementMessage
