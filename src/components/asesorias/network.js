const express = require('express');

const router = express.Router();
const controller = require('./index');
const {isLoggedIn} = require('../../lib/auth');

router.get('/add',isLoggedIn,(req,res)=>{
    res.render('asesorias/add');
});

router.post('/add',isLoggedIn,async(req,res)=>{
    try {
        await controller.handleInsertDate(req.body/*,req.user.id*/);
        req.flash('success','Asesoría guardada correctamente');
        res.redirect('/asesoria/list_asesor');
    } catch (error) {
        console.error("Server Error: "+new Error(error));
    }
});

/* RUTA PARA VER LAS ASESORÍAS CREADAS POR NO TOMADAS POR ALGUIEN */
router.get('/list_asesor',isLoggedIn,async(req,res)=>{
    try{
        const citas = await controller.notTakenDates(req.user.id);
        console.log(citas);
        res.render('asesorias/list_asesorias_libres',{citas:citas[0]});
    }catch(err){
        console.error("Server Error: "+new Error(err));
    }
});

/* RUTA PARA VER LAS ASESORÍAS CREADAS Y TOMADAS POR ALGUIEN */
router.get('/list_asesor_tomadas',isLoggedIn,async(req,res)=>{
    try {
        const citas = await controller.takenDatesBySomeone(req.user.id);
        res.render('asesorias/list_asesor_tomadas',{citas:citas[0]});
    } catch (error) {
        console.error(new Error(error));
    }
});

/* RUTA PARA VER LAS ASESORIAS TOMADAS */
router.get('/list_asesorado',isLoggedIn,async(req,res)=>{
    try {
        const citas = await controller.datesAdvisedSide(req.user.id);
        res.render('asesorias/list_asesorado',{citas:citas[0]});
    } catch (error) {
        console.error(new Error(error));
    }
});

router.get('/delete/:id',isLoggedIn,async(req,res)=>{
    const {id} = req.params;
    try {
        await controller.deleteDate(id);
        req.flash('success','Asesoría removida');
    } catch (error) {
        console.error(new Error(error));
        req.flash('message',"No se pudo eliminar asesoría");
    }
    res.redirect('/asesoria/list_asesor');
    
});

router.get('/edit/:id',isLoggedIn,async(req,res)=>{
    const {id} = req.params;
    try {
        const asesorias = await controller.getDateById(id);
        res.render('asesorias/edit',{asesorias:asesorias[0]});
    } catch (error) {
        console.error(new Error(error));
    }
});

router.post('/edit/:id',isLoggedIn,async(req,res)=>{

    const {id} = req.params;
    try {
        await controller.editDate(req.body,id);
        req.flash('success','Asesoría editada');
    } catch (error) {
        console.error(new Error(error));
        req.flash('message',"No se pudo editar");
    }
    res.redirect('/asesoria/list_asesor');
});

router.get('/dismiss/:id',async(req,res)=>{

    const {id} = req.params;
    try {
        await controller.dismissDate(id);
        req.flash('success',"Aseosría Abandonada");
    } catch (error) {
        req.flash('message',"No se pudo completar la acción");
    }
    res.redirect('/');
});
 

module.exports = router;