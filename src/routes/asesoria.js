const express = require('express');

const router = express.Router();

const pool = require('../database');

router.get('/add',(req,res)=>{
    res.render('asesorias/add');
});

router.post('/add',(req,res)=>{

    const { materia,lugar,descripcion,fechaMDY,fechaTim } = req.body;
    const fecha = fechaMDY+" "+ fechaTim + ":00";
        const newCita = {
            materia,
            lugar,
            descripcion,
            fecha
        };
        pool.query('INSERT INTO citas set ? ',[newCita]);
        //console.log(newCita);
        res.redirect('/asesoria');
});

router.get('/',async(req,res)=>{
    const citas = await pool.query('SELECT * FROM citas');
    console.log(citas);
    res.render('asesorias/list',{citas});
});
 

module.exports = router;