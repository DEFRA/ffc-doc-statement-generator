const chainableMethods = [
  'select',
  'where',
  'whereIn',
  'whereNot',
  'whereNull',
  'whereNotNull',
  'whereRaw',
  'orWhere',
  'orWhereNull',
  'orWhereRaw',
  'insert',
  'update',
  'del',
  'returning',
  'limit',
  'orderBy',
  'first',
  'forUpdate',
  'skipLocked',
  'transacting'
]

const createQueryBuilder = () => {
  const builder = {}
  let pending = Promise.resolve(undefined)

  for (const method of chainableMethods) {
    builder[method] = jest.fn(() => builder)
  }

  builder.resolves = (value) => {
    pending = Promise.resolve(value)
    return builder
  }

  builder.rejects = (error) => {
    pending = Promise.reject(error)
    // Keep the rejection handled until the assertion awaits it, otherwise Node
    // reports an unhandled rejection for tests that only assert on the chain.
    pending.catch(() => {})
    return builder
  }

  builder.then = (onFulfilled, onRejected) => pending.then(onFulfilled, onRejected)
  builder.catch = (onRejected) => pending.catch(onRejected)
  builder.finally = (onFinally) => pending.finally(onFinally)

  return builder
}

const createKnexMock = (tableNames = []) => {
  const builder = createQueryBuilder()
  const knex = jest.fn(() => builder)

  knex.raw = jest.fn()
  knex.destroy = jest.fn()

  const trx = jest.fn(() => builder)
  const transaction = jest.fn(async (callback) => callback(trx))

  const tables = Object.fromEntries(
    tableNames.map(name => [name, jest.fn(() => builder)])
  )

  return {
    knex,
    builder,
    trx,
    transaction,
    close: knex.destroy,
    tables
  }
}

module.exports = {
  createKnexMock,
  createQueryBuilder
}
