const sql = require('mssql');

const config = {
    server: 'DESKTOP-E9CN0ST', // Your SQL Server instance name
    database: 'FoodiGoodi',
    options: {
        trustServerCertificate: true,
        trustedConnection: true,
        enableArithAbort: true,
        instancename: 'SQLEXPRESS'
    },
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', // Replace with your SQL Server username
            password: 'your_password' // Replace with your SQL Server password
        }
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
    sql,
    poolPromise
}; 