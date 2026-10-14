const TABLES = require('../../../app/constants/tables')
const { PRIMARY_KEYS, COLUMNS, pickColumns } = require('../../../app/constants/columns')

describe('pickColumns', () => {
  test('keeps properties that are columns on the table', () => {
    const record = { statementData: 1, dateGenerated: 'value' }

    expect(pickColumns(record, TABLES.generations)).toEqual(record)
  })

  test('drops properties that are not columns on the table', () => {
    const result = pickColumns({ statementData: 1, notAColumn: 'value' }, TABLES.generations)

    expect(result).toEqual({ statementData: 1 })
  })

  test('drops the primary key', () => {
    const result = pickColumns({ generationId: 1, statementData: 1 }, TABLES.generations)

    expect(result).toEqual({ statementData: 1 })
  })

  test('returns an empty object when given no properties', () => {
    expect(pickColumns({}, TABLES.generations)).toEqual({})
  })
})

describe('PRIMARY_KEYS', () => {
  test('each primary key is a column on its table', () => {
    for (const [table, primaryKey] of Object.entries(PRIMARY_KEYS)) {
      expect(COLUMNS[table]).toContain(primaryKey)
    }
  })
})
