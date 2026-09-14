const config = require('../config')
const { Database } = require('ffc-database')

const dbConfig = config.dbConfig[config.env]

// Table names come from the Liquibase changelog and are the single declaration
// of this service's schema surface. Each becomes an accessor on the exported
// object: generations(), noNotifys(), outbox().
const tables = {
  generations: 'generations',
  noNotifys: 'noNotifys',
  outbox: 'outbox'
}

const database = new Database({ ...dbConfig, tables })

module.exports = database.connect()
