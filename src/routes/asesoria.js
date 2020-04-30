const express = require('express');

const router = express.Router();

const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

router.get('/add',isLoggedIn,(req,res)=>{
    res.render('asesorias/add');
});

router.post('/add',isLoggedIn,(req,res)=>{

    const { materia,lugar,descripcion,dia,hora } = req.body;
        const newCita = {
            materia,
            lugar,
            descripcion,
            dia,
            hora,

        };
        pool.query('INSERT INTO citas set ? ',[newCita]);
        req.flash('success','Asesoría guardada correctamente');
        res.redirect('/asesoria');
});

router.get('/',isLoggedIn,async(req,res)=>{
    const citas = await pool.query('SELECT * FROM citas');
    //console.log(citas);
    res.render('asesorias/list',{citas});
});

router.get('/delete/:id',isLoggedIn,async(req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM citas WHERE id = ?',[id]);
    req.flash('success','Asesoria removida');
    res.redirect('/asesoria');
    
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
    res.redirect('/asesoria');
})
 

module.exports = router;