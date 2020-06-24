const pool = require('../../database');

async function insertDate(newCita){
    return await pool.query('INSERT INTO citas set ? ',[newCita]);
};
async function notTakenListProcedure(id){
    return await pool.query(`CALL asesorias_no_tomadas(${id})`);
};

async function takenDatesBySomeoneProcedure(id){
    return await pool.query(`CALL mis_asesorias_tomadas(${id})`)
};
async function datesAdvisedSideProcedure(id){
    return await pool.query(`CALL asesoria_lado_asesorado(${id})`);
};
async function deleteDate(id){
    return await pool.query('DELETE FROM citas WHERE id = ?',[id]);
};
async function getDateById(id){
    return await pool.query('SELECT * FROM citas WHERE id = ?',[id])
};

async function editDate(updatedDate,id){
    return await pool.query('UPDATE citas SET ? WHERE id = ?',[updatedDate,id]);
};
async function dismissDate(id) {
    return await pool.query(`UPDATE citas SET estudiante_id = NULL WHERE id = ${id}`);
};


module.exports = {
    insertDate,
    notTakenListProcedure,
    takenDatesBySomeoneProcedure,
    datesAdvisedSideProcedure,
    deleteDate,
    getDateById,
    editDate,
    dismissDate,
}