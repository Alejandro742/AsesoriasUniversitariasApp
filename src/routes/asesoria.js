const express = require('express');

const router = express.Router();

const pool = require('../database');

router.get('/add',(req,res)=>{
    res.render('asesorias/add');
});

router.post('/add',(req,res)=>{
    res.send('receiver');
});
 

module.exports = router;