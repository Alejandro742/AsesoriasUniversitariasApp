const express = require('express');

const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

router.get('/',async(req,res)=>{

    if(req.user){
        query = `CALL lista_asesorias_home_sesion(${req.user.id})`;
    }
    else {
        query = "CALL lista_asesorias_home()";
    }
    console.log(query);
    const citas = await pool.query(query);
    res.render('asesorias/main_list',{citas:citas[0]});
});

router.get('/tomar_asesoria/:id',isLoggedIn,async(req,res,next)=>{
    await pool.query(`UPDATE citas SET estudiante_id = ${req.user.id} WHERE id = ${req.params.id}`);
    req.flash('success',"Asesoría tomada con éxito!");
    res.redirect('/profile');
});

module.exports = router;