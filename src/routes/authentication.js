const express = require('express');

const router = express.Router();
const pool = require('../database');

router.get('/auth',(req,res)=>{
    res.send('GET AUTH');
});



module.exports = router;