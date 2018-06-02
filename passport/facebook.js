const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const { facebook } = require('../config/keys');
const User = require('../models/userModels');

passport.serializeUser((user, done) => {
  console.log(user);
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
	  .then((user) => {
	  	done(null, user);
	  });
});

passport.use(new FacebookStrategy({
  ...facebook,
  callbackURL: '/auth/facebook/redirect',
  profileFields: ['id', 'displayName', 'emails', 'photos']
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  User.findOne({ facebookId: profile.id })
    .then((currentUser) => {
      console.log(currentUser);
      if(currentUser) {
        //already have the user
        done(null, currentUser);
      } else {
        //if not, create user in db
        return User.findOne({ email: profile.emails[0].value })
      }
    })
    .then(currentUser => {
      if(currentUser) {
        console.log("email already exists.")
        return done(null, false);
      } else {
        new User({
          username: profile.displayName,
          facebookId: profile.id,
          email: profile.emails[0].value
        }).save()
          .then((newUser) => {
            console.log('new user created: ' + newUser);
            done(null, newUser);
          });
      }
    });
}));
