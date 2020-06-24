const config = require('./config');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySqlStore = require('express-mysql-session');
const passport = require('passport');
const {database}=require('./keys');
require('dotenv').config();
// Inicializations

const app = express();
require('./lib/passport');


// Settings
app.set('views',config.hbs.dir);
app.engine(config.hbs.ext,exphbs({
    defaultLayout: config.hbs.defaLay,
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: config.hbs.ext,
    helpers: require('./lib/handlebars'),
}));
app.set('view engine',config.hbs.ext);


// Middlewares

app.use(session({
    secret:'asesoriasmysqlnode',
    resave:false,
    saveUninitialized:false,
    store: new MySqlStore(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global Variables

app.use((req,res,next)=>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

// Routes
app.use(require('./components/index'));
// app.use(require('./components/authentication/network'));
app.use('/asesoria',require('./components/asesorias/network'));

// Publics

app.use(express.static(path.join(__dirname,'public')));

// Starting Server
app.listen(process.env.SERVER_PORT,()=>{
    console.log(`Escuchando en: http://localhost:${process.env.SERVER_PORT}`);
});