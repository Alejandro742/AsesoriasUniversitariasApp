require('dotenv').config();
module.exports = {
    database: {
        host: 'localhost',
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: 'asesorias'
    }
}