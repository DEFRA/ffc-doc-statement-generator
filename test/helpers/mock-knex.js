// Knex query builders are chainable and thenable, so the mock has to be both:
// every builder method returns the same object, and awaiting it resolves with
// whatever the test set via resolves()/rejects().
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

// Mirrors the shape of app/data: { client, transaction, close, ...accessors }.
// Every accessor and the transaction queryable resolve to the same builder, so a
// test asserts on the accessor for the table and the builder for the query.
const createKnexMock = (tableNames = []) => {
  const builder = createQueryBuilder()
  const knex = jest.fn(() => builder)

  knex.raw = jest.fn()
  knex.destroy = jest.fn()

  // A Knex transaction is itself a queryable, so the mock is too.
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
