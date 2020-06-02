// En este archivo se difinen los metodos de autenticacion

const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin',new LocalStrategy({
    usernameField:"nombre",
    passwordField:"password",
    passReqToCallback:true
},async(req,nombre,password,done)=>{
    const rows = await pool.query(`SELECT * FROM estudiantes WHERE email = "${req.body.email}"`);
    if(rows){
        const user = rows[0];
        const isValidPassword = await helpers.matchPassword(req.body.password.trim(),user.password);
        if(isValidPassword && nombre.trim() === user.nombre){
            //contra correcta
            done(null,user,req.flash('success','Welcome'+ user.nombre));
        }
        else{
            //contra incorrecta
            done(null,false,req.flash("message","Datos Incorrectos"));
        }
    }
    else{
        //No se encontró en db
        return done(null,false,req.flash("message","Correo no existe"));
    }
}));

passport.use('local.signup',new LocalStrategy({
    usernameField: 'nombre',
    passwordField: 'password',
    passReqToCallback: true
},async(req,nombre,password,done)=>{

    const { email,centro_id } = req.body;
    const newUser = {
        nombre,
        email,
        centro_id:parseInt(centro_id,10),
        password
    };
    const verifyExistence = await pool.query(`SELECT * FROM estudiantes WHERE email = "${newUser.email}"`);
    if(!verifyExistence[0]){
        newUser.password = await helpers.encryptPassword(password);
        const result = await pool.query('INSERT INTO estudiantes SET ?',[newUser]);
        newUser.id = result.insertId;
        return done(null,newUser);
    }
    else{
        return done(null,false,req.flash("message","Esta cuenta ya existse"));
    }

}));

passport.serializeUser((user,done) =>{
    done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    const rows = await pool.query('SELECT * FROM estudiantes WHERE id = ?',[id]);
    done(null,rows[0]);
});
