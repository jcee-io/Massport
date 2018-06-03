const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { google } = require('../config/keys');
const User = require('../models/userModels');
const PassportInit = require('./index');
const { userIdExists, userEmailExists } = PassportInit;

passport.use(
	new GoogleStrategy({
		...google,
		callbackURL: '/auth/google/redirect',
		scope: ['profile', 'email']
	}, (accessToken, refreshToken, profile, done) => {
		//check if user exists
		const UserOptions = {
			username: profile.displayName,
			googleId: profile.id,
			email: profile.emails[0].value
		};

		User.findOne({ googleId: profile.id })
		  .then(User => userIdExists(User, done, UserOptions.email))
			.then(User => userEmailExists(User, UserOptions, done));
	})
);
