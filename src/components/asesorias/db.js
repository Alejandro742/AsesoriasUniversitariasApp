const pool = require('../../database');

async function insertDate(newCita){
    return await pool.query('INSERT INTO citas set ? ',[newCita]);
};


module.exports = {
    insertDate,
}