const config = require('./config');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

// Inicializations

const app = express();


// Settings
app.set('views',config.hbs.dir);
app.engine('.hbs',exphbs({
    defaultLayout: config.hbs.defaLay,
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: 'hbs'


}));


// Middlewares


app.use(morgan('dev'));


// Global Variables

// Routes
app.use(require('./routes/index'));

// Publics



// Starting Server

app.listen(config.api.port,()=>{
    console.log(`Escuchando en: http://localhost:${config.api.port}`);
});