const passport = require('passport');
const GithubStrategy = require('passport-github');
const { github } = require('../config/keys');
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


passport.use(new GithubStrategy({
  ...github,
  callbackURL: '/auth/github/redirect',
  scope: ['user:email']
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  User.findOne({ githubId: profile.id })
    .then((currentUser) => {
      console.log(currentUser);
      if(currentUser) {
        //already have the user
        done(null, currentUser);
      } else {
        //if not, create user in db
        new User({
          username: profile.displayName,
          githubId: profile.id,
          email: profile.emails[0].value
        }).save()
          .then((newUser) => {
            console.log('new user created: ' + newUser);
            done(null, newUser);
          });
      }
    });
}));
