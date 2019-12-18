const { db_host, db_port, db_user, db_password, db_name } = process.env

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: db_host,
    port: db_port,
    user: db_user,
    password: db_password,
    database: db_name
  }
})

module.exports = knex
