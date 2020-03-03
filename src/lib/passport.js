// En este archivo se difinen los metodos de autenticacion

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');

passport.use('local.signup',new LocalStrategy({
    usernameField: 'nombre',
    passwordField: 'password',
    passReqToCallback: true
},async(req,nombre,password,done)=>{

    const { email,centro_id } = req.body;
    const newUser = {
        nombre,
        email,
        centro_id,
        password
    };
    await pool.query('INSERT INTO estudiantes SET ?',newUser)

}));

// passport.serializeUser((usr,done) =>{

// });

