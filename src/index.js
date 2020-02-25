const config = require('./config');
const express = require('express');
const morgan = require('morgan');

// Inicializations

const app = express();


// Settings



// Middlewares

app.use('/',(req,res)=>{
    res.send('Success');
});

app.use(morgan('dev'));


// Global Variables

// Routes


// Publics



// Starting Server

app.listen(config.port,()=>{
    console.log(`Escuchando en: http://localhost:${config.port}`);
});