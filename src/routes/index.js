const express = require('express');

const router = express.Router();
const pool = require('../database');


router.get('/',async(req,res)=>{
    const citas = await pool.query(`CALL lista_asesorias_home(${req.user.id})`);
    res.render('asesorias/main_list',{citas:citas[0]});
});

router.get('/tomar_asesoria/:id',async(req,res,next)=>{
    await pool.query(`UPDATE citas SET estudiante_id = ${req.user.id} WHERE id = ${req.params.id}`);
    req.flash('success',"Asesoría tomada con éxito!");
    res.redirect('/profile');
});

module.exports = router;