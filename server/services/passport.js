const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(id)
        .then((user) => {
            done(null,user);
        })
});

passport.use(new GoogleStrategy({
    clientID: Keys.googleClientID,
    clientSecret: Keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
},

(accessToken,refreshToken,profile,done) => {

    User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if (existingUser){
                // We already have a record    
                console.log("User Exists");
                done(null,existingUser);
            }else{
                new User({ googleId: profile.id }).save()
                    .then((user) => {
                        done(null,user);
                    });
            }
        })

    
})

);  // the strategy to use we have to provide client id and client secret