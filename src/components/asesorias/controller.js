module.exports = function(injectedStore){
    let db= injectedStore;
    if(!db){
        db = require('./db');
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
        return await db.insertDate(newCita);
    }

    async function notTakenDates(id){
        return await db.notTakenListProcedure(id);
    }
    async function takenDatesBySomeone(id){
        return await db.takenDatesBySomeoneProcedure(id);
    };
    async function datesAdvisedSide(id){
        return await db.datesAdvisedSideProcedure(id);
    };
    async function deleteDate(id){
        return await db.deleteDate(id);
    };
    async function getDateById(id){
        return await db.getDateById(id);
    };
    async function editDate(body,id){
        const objectId = {id};
        const { materia,lugar,descripcion,dia,hora } = body;
        const updatedDate = {
            materia,
            lugar,
            descripcion,
            dia,
            hora
        };
        return await db.editDate(updatedDate,objectId);
    };
    async function dismissDate(id){
        return await db.dismissDate(id);
    };

    return {
        handleInsertDate,
        notTakenDates,
        takenDatesBySomeone,
        datesAdvisedSide,
        deleteDate,
        getDateById,
        dismissDate,
    }
}