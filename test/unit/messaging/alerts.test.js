const alerts = require('../../../app/constants/alerts')

describe('alerts constants', () => {
  test('exports ETL_PROCESS_ERROR with correct value', () => {
    expect(alerts.ETL_PROCESS_ERROR).toBe('uk.gov.defra.ffc.doc.warning.etl.process.error')
  })
})
