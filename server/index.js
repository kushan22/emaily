const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Keys = require('./config/keys');
const app = new express();


passport.use(new GoogleStrategy({
    clientID: Keys.googleClientID,
    clientSecret: Keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
},(accessToken,refreshToken,profile,done) => {
    console.log('Access Token',accessToken);
    console.log('Refresh Token',refreshToken);
    console.log('Profile',profile);
}));  // the strategy to use we have to provide client id and client secret

app.get('/auth/google', passport.authenticate('google',{
    scope: ['profile','email']
})

);

app.get('/auth/google/callback',passport.authenticate('google'));
 
const PORT = process.env.PORT || 5000; 
app.listen(PORT); 

