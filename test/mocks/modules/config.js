const mockConfig = {}

const mockNotifyConfig = {
  emailAddress: 'test@email.com',
  apiKey: '06884244-d67f-4227-8db4-bef4df733a28',
  emailTemplateKey: 'e7623269-b8b0-48d6-a559-33d55bc64298'
}

mockConfig.notifyConfig = mockNotifyConfig

jest.mock('../../../app/config', () => {
  return mockConfig
})

module.exports = mockConfig
