const express = require('express');

const router = express.Router();
const pool = require('../database');


router.get('/',async(req,res)=>{
    //const citas = await pool.query('SELECT * FROM citas');
    //res.render('home/home',{citas});
    //console.log(citas);
    res.send('Hi');
});


module.exports = router;