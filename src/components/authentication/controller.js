module.exports = function(injectedStore){
    let db= injectedStore;
    if(!db){
        db = require('./db');
    }
    async function centersById(id){
        return await db.centersById(id);
    };

    return {
        centersById,
    }
}