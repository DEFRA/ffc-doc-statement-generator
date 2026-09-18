const config = require('../config')
const { Database } = require('ffc-database')

const dbConfig = config.dbConfig[config.env]

const tables = {
  generations: 'generations',
  noNotifys: 'noNotifys',
  outbox: 'outbox'
}

const database = new Database({ ...dbConfig, tables })

module.exports = database.connect()
