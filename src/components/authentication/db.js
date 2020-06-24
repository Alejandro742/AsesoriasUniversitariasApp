const pool = require('../../database');

async function centersById(id){
    return await pool.query(`SELECT nombre FROM centros WHERE id = ${id}`);
};

module.exports = {
    centersById,
}