const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import { Strategy as FacebookStrategy } from 'passport-facebook'

const keys = require('./keys');
const Adopters = require('../models/adopters')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Adopters.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        const {id, displayName, emails } = profile
        const [primaryEmail] = emails;
        var email = primaryEmail; 
        // console.log(id, displayName, email.value);
        Adopters.findOne({googleID: id}).then((currentUser) => {
            console.log(">>>",currentUser);
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null,currentUser);

            } else {
                // if not, create user in our db
                new Adopters({
                    googleID: profile.id,
                    username: profile.displayName,
                    email: email.value
                }).save().then((adopter) => {
                    console.log('created new user: ', adopter);
                    done(null, adopter);
                });
            }
        });
    })
);

