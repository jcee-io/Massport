const passport = require('passport');
const GithubStrategy = require('passport-github');
const { github } = require('../config/keys');
const User = require('../models/userModels');
const PassportInit = require('./index');
const { userIdExists, userEmailExists } = PassportInit;

passport.use(
  new GithubStrategy({
    ...github,
    callbackURL: '/auth/github/redirect',
    scope: ['user:email']
  }, (accessToken, refreshToken, profile, done) => {
    const UserOptions = {
      username: profile.displayName,
      githubId: profile.id,
      email: profile.emails[0].value
    };

    User.findOne({ githubId: profile.id })
      .then(User => userIdExists(User, done, UserOptions.email))
      .then(User => userEmailExists(User, UserOptions, done));
  })
);
