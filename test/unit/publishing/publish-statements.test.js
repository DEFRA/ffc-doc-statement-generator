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
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should publish statements and handle notifications', async () => {
    const mockStatements = [{ publishedStatementId: 1, statement: { scheme: { agreementNumber: '12345' } }, type: { id: 'type-id', type: SCHEDULE }, filename: 'file1.pdf' }]
    getPendingStatements.mockResolvedValue(mockStatements)
    config.sfi23QuarterlyStatementEnabled = true
    config.scheduleEnabled = true
    config.delinkedGenerateStatementEnabled = true

    await publishStatements()

    expect(getPendingStatements).toHaveBeenCalled()
    expect(sendPublishMessage).toHaveBeenCalledWith(mockStatements[0].statement, mockStatements[0].filename, mockStatements[0].type.id)
    expect(setPublished).toHaveBeenCalledWith(mockStatements[0].publishedStatementId, true)
  })

  test('should handle CRM message sending if enabled', async () => {
    const mockStatements = [{ publishedStatementId: 1, statement: { scheme: { agreementNumber: '12345' } }, type: { id: 'type-id' }, filename: 'file1.pdf' }]
    getPendingStatements.mockResolvedValue(mockStatements)
    config.sendCrmMessageEnabled = true

    await publishStatements()

    expect(sendCrmMessage).toHaveBeenCalledWith(mockStatements[0].statement, mockStatements[0].filename, mockStatements[0].type)
  })

  test('should handle logging if enabled', async () => {
    const mockStatements = [{ publishedStatementId: 1, statement: { scheme: { agreementNumber: '12345' } }, type: { id: 'type-id' }, filename: 'file1.pdf' }]
    getPendingStatements.mockResolvedValue(mockStatements)
    config.saveLogEnabled = true

    await publishStatements()

    expect(saveLog).toHaveBeenCalledWith(mockStatements[0].statement, mockStatements[0].filename, expect.any(Date))
  })

  test('should not send publish message if notifications are not allowed', async () => {
    const mockStatements = [{ publishedStatementId: 1, statement: { scheme: { agreementNumber: '12345' } }, type: { id: 'type-id', type: SCHEDULE }, filename: 'file1.pdf' }]
    getPendingStatements.mockResolvedValue(mockStatements)
    getNoNotifyByAgreementNumber.mockResolvedValue(false)
    config.sfi23QuarterlyStatementEnabled = false
    config.scheduleEnabled = false

    await publishStatements()

    expect(sendPublishMessage).not.toHaveBeenCalled()
  })

  test('should handle statements with delinked2024 disabled', async () => {
    const mockStatements = [{ publishedStatementId: 1, statement: { scheme: { agreementNumber: '12345', year: 2024 } }, type: { id: 'type-id', type: DELINKED }, filename: 'file1.pdf' }]
    getPendingStatements.mockResolvedValue(mockStatements)
    config.sendDelinked2024Statements = false

    await publishStatements()

    expect(sendPublishMessage).not.toHaveBeenCalled()
  })
})
