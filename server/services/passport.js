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

async (accessToken,refreshToken,profile,done) => {

    const existingUser  = await User.findOne({googleId: profile.id});
    if (existingUser){
        // We already have a record
        console.log("User Exists");
        return done(null,existingUser);
    }
        const user = await new User({googleId: profile.id}).save();
        done(null,user);
}

)

);  // the strategy to use we have to provide client id and client secret