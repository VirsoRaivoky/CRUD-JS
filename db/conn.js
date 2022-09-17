const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'wilson',
    password:'info2k21',
    database:'games',
    port: 3306
})

module.exports = pool