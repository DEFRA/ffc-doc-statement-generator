const PdfPrinter = require('pdfmake')
const moment = require('moment')
const fonts = require('./fonts')
const saveLog = require('./save-log')
const publish = require('./publish')
const getDefinition = require('./get-definition')
const sendPublishMessage = require('../messaging/send-publish-message')
const sendCrmMessage = require('../messaging/crm/send-crm-message')
const printer = new PdfPrinter(fonts)

const generateStatement = async (statement) => {
  const docDefinition = getDefinition(statement)
  const timestamp = new Date()
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  const filename = await publish(pdfDoc, statement, moment(timestamp).format('YYYYMMDDHHmmssSS'))
  await sendPublishMessage(statement, filename)
  await sendCrmMessage(statement, filename)
  await saveLog(statement, filename, timestamp)
}

module.exports = generateStatement
