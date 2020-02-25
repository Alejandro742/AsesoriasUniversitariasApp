const express = require('express');

const router = express.Router();


router.get('/asesoria',(req,res)=>{
    res.send('GET ASESORIA');
});



module.exports = router;