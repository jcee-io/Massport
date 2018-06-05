const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/userModels');
const PassportInit = require('./index');

passport.use(
  new LocalStrategy(
    (username, password, done) => {

      User.findOne({ username })
        .then((currentUser) => {
          if(!currentUser) {
            done(null, false);
          } else {
            User.authenticate()(username, password)
              .then((result) => {
                if(!result) {
                  done(null, false);
                } else {
                  done(null, currentUser);
                }
              });
          }
        });
    };
  )
);
