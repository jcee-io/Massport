const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const { facebook } = require('../config/keys');
const User = require('../models/userModels');
const PassportInit = require('./index');
const { userIdExists, userEmailExists } = PassportInit;

passport.use(
  new FacebookStrategy({
    ...facebook,
    callbackURL: '/auth/facebook/redirect',
    profileFields: ['id', 'displayName', 'emails', 'photos']
  }, (accessToken, refreshToken, profile, done) => {
    const UserOptions = {
      username: profile.displayName,
      facebookId: profile.id,
      email: profile.emails[0].value
    };

    User.findOne({ facebookId: profile.id })
      .then(User => userIdExists(User, done, UserOptions.email))
      .then(User => userEmailExists(User, UserOptions, done));
  })
);
