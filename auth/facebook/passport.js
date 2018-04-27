import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

export function setup(Adopters, config) {
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    enableProof: true,
    callbackURL: config.facebook.callbackURL,
    profileFields: [
      'displayName',
      'emails'
    ]
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("Your accessToken is :"+accessToken);
    console.log("Your refreshToken is :"+refreshToken );
    done(null,profile);


    // Adopters.find({where: {'facebookID': profile.id}})
    //   .then(user => {
    //     if(user) {
    //       return done(null, user);
    //     }

    //     user = Adopters.build({
    //       username: profile.displayName,
    //       email: profile.emails[0].value,
    //       role: 'user',
    //       provider: 'facebook',
    //       facebookID: profile.id
    //     });
    //     user.save()
    //       .then(savedUser => done(null, savedUser))
    //       .catch(err => done(err));
    //   })
    //   .catch(err => done(err));
  }));
}
