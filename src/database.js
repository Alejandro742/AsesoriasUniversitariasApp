const {promisify} = require('util')
const mysql = require('mysql');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err,connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection was closes');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has yo many connections');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    if(connection) connection.release();
    console.log('DB is conncected');
    return;
});

pool.query = promisify(pool.query);//cada vez que se haga una llamada a db se podrá usar promesas


module.exports = pool;