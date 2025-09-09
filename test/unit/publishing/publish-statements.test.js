const config = require('../../../app/config')
const { DELINKED, SCHEDULE } = require('../../../app/constants/document-types')
const sendPublishMessage = require('../../../app/messaging/publish/send-publish-message')
const sendCrmMessage = require('../../../app/publishing/crm/send-crm-message')
const getNoNotifyByAgreementNumber = require('../../../app/publishing/get-no-notify-by-agreement-number')
const { getPendingStatements } = require('../../../app/publishing/get-pending-statements')
const { publishStatements } = require('../../../app/publishing/publish-statements')
const { setPublished } = require('../../../app/publishing/set-published')
const getGenerationById = require('../../../app/publishing/get-generation-by-id')

jest.mock('../../../app/publishing/get-pending-statements')
jest.mock('../../../app/messaging/publish/send-publish-message')
jest.mock('../../../app/publishing/get-no-notify-by-agreement-number')
jest.mock('../../../app/publishing/crm/send-crm-message')
jest.mock('../../../app/publishing/set-published')
jest.mock('../../../app/config')
jest.mock('../../../app/publishing/get-generation-by-id')

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
      outboxId: 1,
      generationId: 1,
      type: { id: 'type-id', type: SCHEDULE.type }
    }]
    const mockGenerationData = {
      statementData: { scheme: { agreementNumber: '12345' } },
      filename: 'file1.pdf'
    }

    getPendingStatements.mockResolvedValue(mockStatements)
    getGenerationById.mockResolvedValue(mockGenerationData)
    config.sfi23QuarterlyStatementEnabled = true
    config.scheduleEnabled = true
    config.delinkedGenerateStatementEnabled = true
    config.sendCrmMessageEnabled = false

    await publishStatements()

    expect(getPendingStatements).toHaveBeenCalled()
    expect(getGenerationById).toHaveBeenCalledWith(mockStatements[0].generationId)
    expect(sendPublishMessage).toHaveBeenCalledWith(mockGenerationData.statementData, mockGenerationData.filename, mockStatements[0].type.id)
    expect(setPublished).toHaveBeenCalledWith(mockStatements[0].outboxId, true, false, null)
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Identified statement for publishing:'), expect.any(String))
    expect(consoleInfoSpy).toHaveBeenCalledWith(`Publish message sent for document ${mockGenerationData.filename}`)
    expect(consoleLogSpy).toHaveBeenCalledWith('Statement finished publishing')
  })

  test('should send CRM message and log when enabled', async () => {
    const mockStatements = [{
      outboxId: 1,
      generationId: 1,
      type: { id: 'type-id', type: SCHEDULE.type }
    }]
    const mockGenerationData = {
      statementData: { scheme: { agreementNumber: '12345' } },
      filename: 'file1.pdf'
    }

    getPendingStatements.mockResolvedValue(mockStatements)
    getGenerationById.mockResolvedValue(mockGenerationData)
    config.sendCrmMessageEnabled = true

    await publishStatements()

    expect(sendCrmMessage).toHaveBeenCalledWith(mockGenerationData.statementData, mockGenerationData.filename, mockStatements[0].type)
    expect(consoleInfoSpy).toHaveBeenCalledWith(`CRM message sent for document ${mockGenerationData.filename}`)
  })

  test('should not send CRM message and log when disabled', async () => {
    const mockStatements = [{
      outboxId: 1,
      generationId: 1,
      type: { id: 'type-id', type: SCHEDULE.type }
    }]
    const mockGenerationData = {
      statementData: { scheme: { agreementNumber: '12345' } },
      filename: 'file1.pdf'
    }

    getPendingStatements.mockResolvedValue(mockStatements)
    getGenerationById.mockResolvedValue(mockGenerationData)
    config.sendCrmMessageEnabled = false

    await publishStatements()

    expect(sendCrmMessage).not.toHaveBeenCalled()
    expect(consoleInfoSpy).toHaveBeenCalledWith(`CRM message not sent for document ${mockGenerationData.filename} - CRM messaging is disabled`)
  })

  test('should not send publish message if notifications are not allowed and log info', async () => {
    const mockStatements = [{
      outboxId: 1,
      generationId: 1,
      type: { id: 'type-id', type: SCHEDULE.type }
    }]
    const mockGenerationData = {
      statementData: { scheme: { agreementNumber: '12345' }, excludedFromNotify: false },
      filename: 'file1.pdf'
    }

    getPendingStatements.mockResolvedValue(mockStatements)
    getGenerationById.mockResolvedValue(mockGenerationData)
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
      outboxId: 1,
      generationId: 1,
      type: { id: 'type-id', type: DELINKED.type }
    }]
    const mockGenerationData = {
      statementData: { scheme: { agreementNumber: '12345', year: 2024 } },
      filename: 'file1.pdf'
    }

    getPendingStatements.mockResolvedValue(mockStatements)
    getGenerationById.mockResolvedValue(mockGenerationData)
    config.sendDelinked2024Statements = false
    config.delinkedGenerateStatementEnabled = true

    await publishStatements()

    expect(sendPublishMessage).not.toHaveBeenCalled()
    expect(consoleInfoSpy).toHaveBeenCalledWith(expect.stringContaining('Publish message not sent for document'))
  })

  test('should handle multiple statements and log all statements publishing', async () => {
    const mockStatements = [
      {
        outboxId: 1,
        generationId: 1,
        type: { id: 'type1', type: SCHEDULE.type }
      },
      {
        outboxId: 2,
        generationId: 2,
        type: { id: 'type2', type: DELINKED.type }
      }
    ]
    const mockGenerationData1 = {
      statementData: { scheme: { agreementNumber: '12345' } },
      filename: 'file1.pdf'
    }
    const mockGenerationData2 = {
      statementData: { scheme: { agreementNumber: '67890' } },
      filename: 'file2.pdf'
    }

    getPendingStatements.mockResolvedValue(mockStatements)
    getGenerationById.mockImplementation((id) => {
      if (id === 1) return Promise.resolve(mockGenerationData1)
      if (id === 2) return Promise.resolve(mockGenerationData2)
    })
    config.sfi23QuarterlyStatementEnabled = true
    config.scheduleEnabled = true
    config.delinkedGenerateStatementEnabled = true
    config.sendCrmMessageEnabled = true
    getNoNotifyByAgreementNumber.mockResolvedValue(false)

    await publishStatements()

    expect(sendPublishMessage).toHaveBeenCalledTimes(2)
    expect(sendCrmMessage).toHaveBeenCalledTimes(2)
    expect(setPublished).toHaveBeenCalledTimes(2)
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Identified statement for publishing:'), expect.any(String))
    expect(consoleLogSpy).toHaveBeenCalledWith('Statement finished publishing')
  })
})
