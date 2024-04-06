const {Pool} = require('pg')

const pool = new Pool({
    user: 'test_user',
    host: 'localhost',
    database: 'blog',
    password: 'test_password',
    port: 5432
})

module.exports = pool;