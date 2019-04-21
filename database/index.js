var mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '456',
    database: 'ebikeshop'
})

module.exports = db