jest.mock('../../app/config')

const createCrmMessage = require('../../app/publishing/crm/create-crm-message')
const mockStatement = require('../mocks/mock-delinked-statement')
const { DELINKEDSTATEMENT: FILENAME } = require('../mocks/components/filename')

const BLOB_URL = `https://myBlobStorageAccount.blob.core.windows.net/statements/outbound/${FILENAME}`

describe('sendCrmMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test.each([
    { description: 'statement has no sbi', update: () => { mockStatement.sbi = null } },
    { description: 'statement has no frn', update: () => { mockStatement.frn = null } },
    { description: 'filename is null', update: () => {} }
  ])('should throw Error when $description', async ({ update, description }) => {
    update()
    const blobUrl = description === 'filename is null' ? null : BLOB_URL
    const wrapper = async () => {
      createCrmMessage(mockStatement, blobUrl)
    }

    await expect(wrapper).rejects.toThrow(Error)
  })
})
