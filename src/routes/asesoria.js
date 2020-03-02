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
        req.flash('success','Asesoría guardada correctamente');
        res.redirect('/asesoria');
});

router.get('/',async(req,res)=>{
    const citas = await pool.query('SELECT * FROM citas');
    //console.log(citas);
    res.render('asesorias/list',{citas});
});

router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM citas WHERE id = ?',[id]);
    req.flash('success','Asesoria removida');
    res.redirect('/asesoria');
    
});

router.get('/edit/:id',async(req,res)=>{
    const {id} = req.params;
    const asesorias = await pool.query('SELECT * FROM citas WHERE id = ?',[id]);
    res.render('asesorias/edit',{asesorias:asesorias[0]});
});

router.post('/edit/:id',(req,res)=>{
    const {id} = req.params;
    const {materia,lugar,descripcion,fechaMDY,fechaTim} = req.body;
    const fecha = fechaMDY+" "+ fechaTim + ":00";
    const newAsesoria = {
        materia,
        lugar,
        descripcion,
        fecha
    };
    pool.query('UPDATE citas SET ? WHERE id = ?',[newAsesoria,id]);
    req.flash('success','Asesoria editada');
    res.redirect('/asesoria');
})
 

module.exports = router;