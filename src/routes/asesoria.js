const express = require('express');

const router = express.Router();

const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

router.get('/add',isLoggedIn,(req,res)=>{
    res.render('asesorias/add');
});

router.post('/add',isLoggedIn,(req,res)=>{

    const asesor_id = req.user.id;
    const { materia,lugar,descripcion,dia,hora } = req.body;
        const newCita = {
            materia,
            lugar,
            descripcion,
            dia,
            hora,
            asesor_id,

        };
        //console.log(newCita);
         pool.query('INSERT INTO citas set ? ',[newCita]);
         req.flash('success','Asesoría guardada correctamente');
         res.redirect('/asesoria/list_asesor');
});

/* RUTA PARA VER LAS ASESORÍAS CREADAS POR NO TOMADAS POR ALGUIEN */
router.get('/list_asesor',isLoggedIn,async(req,res)=>{
    const citas = await pool.query(`CALL asesorias_no_tomadas(${req.user.id})`);
    //console.log(citas[0]);
    res.render('asesorias/list_asesorias_libres',{citas:citas[0]});
});

/* RUTA PARA VER LAS ASESORÍAS CREADAS Y TOMADAS POR ALGUIEN */
router.get('/list_asesor_tomadas',isLoggedIn,async(req,res)=>{
    const citas = await pool.query(`CALL mis_asesorias_tomadas(${req.user.id})`);
    res.render('asesorias/list_asesor_tomadas',{citas:citas[0]});
});

/* RUTA PARA VER LAS ASESORIAS TOMADAS */
router.get('/list_asesorado',isLoggedIn,async(req,res)=>{
    const citas = await pool.query(`CALL asesoria_lado_asesorado(${req.user.id})`);
    //console.log(citas[0]);
    res.render('asesorias/list_asesorado',{citas:citas[0]});
});

router.get('/delete/:id',isLoggedIn,async(req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM citas WHERE id = ?',[id]);
    req.flash('success','Asesoria removida');
    res.redirect('/asesoria/list_asesor');
    
});

router.get('/edit/:id',isLoggedIn,async(req,res)=>{
    const {id} = req.params;
    const asesorias = await pool.query('SELECT * FROM citas WHERE id = ?',[id]);
    res.render('asesorias/edit',{asesorias:asesorias[0]});
});

router.post('/edit/:id',isLoggedIn,(req,res)=>{
    const {id} = req.params;
    const { materia,lugar,descripcion,dia,hora } = req.body;
        const newCita = {
            materia,
            lugar,
            descripcion,
            dia,
            hora
        };
    pool.query('UPDATE citas SET ? WHERE id = ?',[newCita,id]);
    req.flash('success','Asesoria editada');
    res.redirect('/asesoria/list_asesor');
});

router.get('/dismiss/:id',async(req,res)=>{
    const {id} = req.params;
    await pool.query(`UPDATE citas SET estudiante_id = NULL WHERE id = ${id}`);
    req.flash('success',"Aseosría Abandonada");
    res.redirect('/');
});
 

module.exports = router;