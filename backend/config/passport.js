
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const {googleClientId, googleClientSecret} = require('../config/keys.js')


passport.use(new GoogleStrategy({
    clientID:     googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: "http://localhost:5050/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {

    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null,profile);
  }
));

passport.serializeUser(function(user, done){
    done(null, user);
})
passport.deserializeUser(function(user, done){
    done(null, user);
})