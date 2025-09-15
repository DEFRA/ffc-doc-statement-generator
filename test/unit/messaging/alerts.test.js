const alerts = require('../../../app/constants/alerts')

describe('alerts constants', () => {
  test('exports PUBLISH_ERROR with correct value', () => {
    expect(alerts.PUBLISH_ERROR).toBe('uk.gov.defra.ffc.doc.data.publishing.error')
  })
})
