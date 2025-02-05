const storage = require('../../app/storage')
const config = require('../../app/config').storageConfig

describe('storage', () => {
  beforeEach(async () => {
    await storage.initialiseContainers()
  })

  test('initializes containers on startup', async () => {
    const containerClient = storage.blobServiceClient.getContainerClient(config.container)
    const containerExists = await containerClient.exists()
    expect(containerExists).toBe(true)
  })

  test('creates placeholder files during initialisation', async () => {
    const containerClient = storage.blobServiceClient.getContainerClient(config.container)
    const blobClient = containerClient.getBlockBlobClient(`${config.folder}/default.txt`)
    const blobExists = await blobClient.exists()
    expect(blobExists).toBe(true)
  })

  test('gets outbound blob client', async () => {
    const filename = 'test.txt'
    const blobClient = await storage.getOutboundBlobClient(filename)
    expect(blobClient).toBeDefined()
    expect(blobClient.name).toContain(filename)
  })
})
