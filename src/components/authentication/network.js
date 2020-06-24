const express = require('express');
const {isLoggedIn,isNotLoggedIn} = require('../../lib/auth');
const router = express.Router();
const passport = require('passport');
const controller = require('./index');


router.get('/signup',(req,res)=>{
    res.render('auth/signup');
});

router.post('/signup',isNotLoggedIn,passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));


router.get('/signin',(req,res)=>{
    res.render('auth/signin');
});

router.post('/signin',(passport.authenticate('local.signin',{
    successRedirect:"/profile",
    failureRedirect:'/signin',
    failureFlash:true,
})));

router.get('/profile',isLoggedIn,async(req,res)=>{
    const data_centro = await controller.centersById(req.user.centro_id);
    res.render('profile',{centro:data_centro[0]});
});
router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;