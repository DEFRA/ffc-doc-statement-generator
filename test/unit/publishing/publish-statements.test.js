const config = require('../../../app/config')
const { DELINKED, SCHEDULE } = require('../../../app/constants/document-types')
const sendPublishMessage = require('../../../app/messaging/publish/send-publish-message')
const sendCrmMessage = require('../../../app/publishing/crm/send-crm-message')
const getNoNotifyByAgreementNumber = require('../../../app/publishing/get-no-notify-by-agreement-number')
const { getPendingStatements } = require('../../../app/publishing/get-pending-statements')
const { publishStatements } = require('../../../app/publishing/publish-statements')
const saveLog = require('../../../app/publishing/save-log')
const { setPublished } = require('../../../app/publishing/set-published')

jest.mock('../../../app/publishing/get-pending-statements')
jest.mock('../../../app/messaging/publish/send-publish-message')
jest.mock('../../../app/publishing/get-no-notify-by-agreement-number')
jest.mock('../../../app/publishing/crm/send-crm-message')
jest.mock('../../../app/publishing/save-log')
jest.mock('../../../app/publishing/set-published')
jest.mock('../../../app/config')

describe('publishStatements', () => {
  let consoleLogSpy
  let consoleInfoSpy

  beforeEach(() => {
    jest.clearAllMocks()
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { })
    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => { })
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
    consoleInfoSpy.mockRestore()
  })

  test('should publish statements and handle notifications, log correctly', async () => {
    const mockStatements = [{
      publishedStatementId: 1,
      statement: { scheme: { agreementNumber: '12345' } },
      type: { id: 'type-id', type: SCHEDULE.type },
      filename: 'file1.pdf'
    }]
    getPendingStatements.mockResolvedValue(mockStatements)
    config.sfi23QuarterlyStatementEnabled = true
    config.scheduleEnabled = true
    config.delinkedGenerateStatementEnabled = true
    config.sendCrmMessageEnabled = false
    config.saveLogEnabled = false

    await publishStatements()

    expect(getPendingStatements).toHaveBeenCalled()
    expect(sendPublishMessage).toHaveBeenCalledWith(mockStatements[0].statement, mockStatements[0].filename, mockStatements[0].type.id)
    expect(setPublished).toHaveBeenCalledWith(mockStatements[0].publishedStatementId, true)
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Identified statement for publishing:'), expect.any(String))
    expect(consoleInfoSpy).toHaveBeenCalledWith(`Publish message sent for document ${mockStatements[0].filename}`)
    expect(consoleLogSpy).toHaveBeenCalledWith('Statement finished publishing')
  })

  test('should send CRM message and log when enabled', async () => {
    const mockStatements = [{
      publishedStatementId: 1,
      statement: { scheme: { agreementNumber: '12345' } },
      type: { id: 'type-id', type: SCHEDULE.type },
      filename: 'file1.pdf'
    }]
    getPendingStatements.mockResolvedValue(mockStatements)
    config.sendCrmMessageEnabled = true
    config.saveLogEnabled = false

    await publishStatements()

    expect(sendCrmMessage).toHaveBeenCalledWith(mockStatements[0].statement, mockStatements[0].filename, mockStatements[0].type)
    expect(consoleInfoSpy).toHaveBeenCalledWith(`CRM message sent for document ${mockStatements[0].filename}`)
  })

  test('should not send CRM message and log when disabled', async () => {
    const mockStatements = [{
      publishedStatementId: 1,
      statement: { scheme: { agreementNumber: '12345' } },
      type: { id: 'type-id', type: SCHEDULE.type },
      filename: 'file1.pdf'
    }]
    getPendingStatements.mockResolvedValue(mockStatements)
    config.sendCrmMessageEnabled = false
    config.saveLogEnabled = false

    await publishStatements()

    expect(sendCrmMessage).not.toHaveBeenCalled()
    expect(consoleInfoSpy).toHaveBeenCalledWith(`CRM message not sent for document ${mockStatements[0].filename} - CRM messaging is disabled`)
  })

  test('should save log and log correctly when enabled', async () => {
    const mockStatements = [{
      publishedStatementId: 1,
      statement: { scheme: { agreementNumber: '12345' } },
      type: { id: 'type-id', type: SCHEDULE.type },
      filename: 'file1.pdf'
    }]
    getPendingStatements.mockResolvedValue(mockStatements)
    config.saveLogEnabled = true
    config.sendCrmMessageEnabled = false

    await publishStatements()

    expect(saveLog).toHaveBeenCalledWith(mockStatements[0].statement, mockStatements[0].filename, expect.any(Date))
    expect(consoleInfoSpy).toHaveBeenCalledWith(`Log saved for document ${mockStatements[0].filename}`)
  })

  test('should not send publish message if notifications are not allowed and log info', async () => {
    const mockStatements = [{
      publishedStatementId: 1,
      statement: { scheme: { agreementNumber: '12345', excludedFromNotify: false } },
      type: { id: 'type-id', type: SCHEDULE.type },
      filename: 'file1.pdf'
    }]
    getPendingStatements.mockResolvedValue(mockStatements)
    getNoNotifyByAgreementNumber.mockResolvedValue(true)
    config.sfi23QuarterlyStatementEnabled = false
    config.scheduleEnabled = false
    config.delinkedGenerateStatementEnabled = false

    await publishStatements()

    expect(sendPublishMessage).not.toHaveBeenCalled()
    expect(consoleInfoSpy).toHaveBeenCalledWith(expect.stringContaining('Publish message not sent for document'))
  })

  test('should not send publish message if delinked2024 is disabled and log info', async () => {
    const mockStatements = [{
      publishedStatementId: 1,
      statement: { scheme: { agreementNumber: '12345', year: 2024 } },
      type: { id: 'type-id', type: DELINKED.type },
      filename: 'file1.pdf'
    }]
    getPendingStatements.mockResolvedValue(mockStatements)
    config.sendDelinked2024Statements = false
    config.delinkedGenerateStatementEnabled = true

    await publishStatements()

    expect(sendPublishMessage).not.toHaveBeenCalled()
    expect(consoleInfoSpy).toHaveBeenCalledWith(expect.stringContaining('Publish message not sent for document'))
  })

  test('should handle multiple statements and log all statements publishing', async () => {
    const mockStatements = [
      {
        publishedStatementId: 1,
        statement: { scheme: { agreementNumber: '12345' } },
        type: { id: 'type1', type: SCHEDULE.type },
        filename: 'file1.pdf'
      },
      {
        publishedStatementId: 2,
        statement: { scheme: { agreementNumber: '67890' } },
        type: { id: 'type2', type: DELINKED.type },
        filename: 'file2.pdf'
      }
    ]
    getPendingStatements.mockResolvedValue(mockStatements)
    config.sfi23QuarterlyStatementEnabled = true
    config.scheduleEnabled = true
    config.delinkedGenerateStatementEnabled = true
    config.sendCrmMessageEnabled = true
    config.saveLogEnabled = true
    getNoNotifyByAgreementNumber.mockResolvedValue(false)

    await publishStatements()

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Identified statement for publishing:'), expect.any(String))
    expect(sendPublishMessage).toHaveBeenCalledTimes(2)
    expect(sendCrmMessage).toHaveBeenCalledTimes(2)
    expect(saveLog).toHaveBeenCalledTimes(2)
    expect(setPublished).toHaveBeenCalledTimes(2)
    expect(consoleLogSpy).toHaveBeenCalledWith('Statement finished publishing')
  })
})
