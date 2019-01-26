const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'testdatabase',
    password: '1995op1995'
});

module.exports = pool.promise();
