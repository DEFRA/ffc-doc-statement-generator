jest.mock('@azure/storage-blob')
jest.mock('@azure/identity')

describe('storage', () => {
  let storage
  const mockstorage = {
    upload: jest.fn().mockResolvedValue({}),
    url: 'test-url'
  }

  const mockContainer = {
    createIfNotExists: jest.fn(),
    getBlockBlobClient: jest.fn().mockReturnValue(mockstorage)
  }

  const mockStorageConfig = {
    useConnectionStr: true,
    connectionStr: 'connection-string',
    createContainers: true,
    storageAccount: 'fakestorageaccount',
    managedIdentityClientId: 'fake-client-id',
    container: 'test-container',
    folder: 'test-folder'
  }

  const mockBlobServiceClient = {
    getContainerClient: jest.fn().mockReturnValue(mockContainer)
  }

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()

    require('@azure/storage-blob').BlobServiceClient.fromConnectionString = jest
      .fn()
      .mockReturnValue(mockBlobServiceClient)

    require('@azure/storage-blob').BlobServiceClient.mockImplementation(() => mockBlobServiceClient)
    require('@azure/identity').DefaultAzureCredential.mockImplementation(() => ({}))

    jest.mock('../../app/config', () => ({
      storageConfig: mockStorageConfig
    }))

    jest.spyOn(console, 'log').mockImplementation(() => {})

    storage = require('../../app/storage')
  })

  afterEach(() => {
    console.log.mockRestore()
  })

  test.each([
    { useConnectionStr: true, expectedLog: 'Using connection string for BlobServiceClient' },
    { useConnectionStr: false, expectedLog: 'Using DefaultAzureCredential for BlobServiceClient' }
  ])('should initialise BlobServiceClient correctly when useConnectionStr = %s', async ({ useConnectionStr, expectedLog }) => {
    jest.resetModules()
    mockStorageConfig.useConnectionStr = useConnectionStr
    jest.mock('../../app/config', () => ({ storageConfig: mockStorageConfig }))
    storage = require('../../app/storage')

    if (useConnectionStr) {
      expect(require('@azure/storage-blob').BlobServiceClient.fromConnectionString)
        .toHaveBeenCalledWith(mockStorageConfig.connectionStr)
    } else {
      expect(require('@azure/identity').DefaultAzureCredential).toHaveBeenCalledWith({
        managedIdentityClientId: mockStorageConfig.managedIdentityClientId
      })
      expect(require('@azure/storage-blob').BlobServiceClient).toHaveBeenCalledWith(
        `https://${mockStorageConfig.storageAccount}.blob.core.windows.net`,
        expect.any(Object)
      )
    }

    expect(console.log).toHaveBeenCalledWith(expectedLog)
  })

  test.each([
    { createContainers: true, shouldLog: true, shouldCallCreate: true },
    { createContainers: false, shouldLog: false, shouldCallCreate: false }
  ])('should handle container creation correctly when createContainers = %s', async ({ createContainers, shouldLog, shouldCallCreate }) => {
    mockStorageConfig.createContainers = createContainers
    await storage.initialiseContainers()
    if (shouldLog) {
      expect(console.log).toHaveBeenCalledWith('Making sure blob containers exist')
    } else {
      expect(console.log).not.toHaveBeenCalledWith('Making sure blob containers exist')
    }
    if (shouldCallCreate) {
      expect(mockContainer.createIfNotExists).toHaveBeenCalled()
    } else {
      expect(mockContainer.createIfNotExists).not.toHaveBeenCalled()
    }
  })

  test('gets outbound blob client', async () => {
    const result = await storage.getOutboundBlobClient('test-file.txt')
    expect(result.url).toBe('test-url')
    expect(mockContainer.getBlockBlobClient).toHaveBeenCalledWith('test-folder/test-file.txt')
  })

  describe('container initialization', () => {
    beforeEach(() => {
      jest.resetModules()
      jest.clearAllMocks()
      require('@azure/storage-blob').BlobServiceClient.fromConnectionString = jest
        .fn()
        .mockReturnValue(mockBlobServiceClient)
      require('@azure/storage-blob').BlobServiceClient.mockImplementation(() => mockBlobServiceClient)
      jest.mock('../../app/config', () => ({ storageConfig: mockStorageConfig }))
      storage = require('../../app/storage')
    })

    test('initializes folders on first call', async () => {
      await storage.getOutboundBlobClient('test.txt')
      expect(mockContainer.getBlockBlobClient).toHaveBeenNthCalledWith(1, 'test-folder/default.txt')
      expect(mockContainer.getBlockBlobClient).toHaveBeenNthCalledWith(2, 'test-folder/test.txt')
      expect(mockstorage.upload).toHaveBeenCalledWith('Placeholder', 'Placeholder'.length)
    })

    test('skips folder initialization on subsequent calls', async () => {
      await storage.initialiseContainers()
      await storage.getOutboundBlobClient('test.txt')
      expect(mockContainer.getBlockBlobClient).toHaveBeenCalledTimes(2)
      expect(mockstorage.upload).toHaveBeenCalledTimes(1)
    })

    test('initializes folders if containersInitialised is false', async () => {
      await storage.initialiseContainers()
      expect(mockContainer.getBlockBlobClient).toHaveBeenCalledWith('test-folder/default.txt')
      expect(mockstorage.upload).toHaveBeenCalledTimes(1)
    })
  })
})
