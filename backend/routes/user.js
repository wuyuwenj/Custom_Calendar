//Google Login
const express = require('express');
const passport = require('passport');
const router = express();
require("../config/passport");

function isLoggedIn(req,res,next){
  req.user ? next() : res.sendStatus(401);
}

router.get('/',(req,res)=>{
  res.send('<a href="auth/google">Authenticate with Google</a>');
});

router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email','profile'],
  })
)

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
)

router.get('/protected',(req,res)=>{
  res.send("Hello!");
});

router.get('/auth/failure',isLoggedIn,(req,res)=>{
  res.send("something went wrong!");
});


module.exports = router;