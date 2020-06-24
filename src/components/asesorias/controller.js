module.exports = function(injectedStore){
    let pool= injectedStore;
    if(!pool){
        pool = require('./db');
    }
    async function handleInsertDate(body){
        // const asesor_id = id;
        const { materia,lugar,descripcion,dia,hora,asesor_id,estudiante_id } = body;
            const newCita = {
                materia,
                lugar,
                descripcion,
                dia,
                hora,
                asesor_id,
                estudiante_id,
            };
        return await pool.insertDate(newCita);
    }

    return {
        handleInsertDate,
    }
}