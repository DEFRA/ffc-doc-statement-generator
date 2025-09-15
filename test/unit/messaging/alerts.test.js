const alerts = require('../../../app/constants/alerts')

describe('alerts constants', () => {
  test('exports DATA_PUBLISHING_ERROR with correct value', () => {
    expect(alerts.DATA_PUBLISHING_ERROR).toBe('uk.gov.defra.ffc.doc.data.publishing.error')
  })
})
