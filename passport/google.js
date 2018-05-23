const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');
const User = require('../models/userModels');


passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
	  .then((user) => {
	  	done(null, user);
	  });
});

passport.use(
	new GoogleStrategy({
		...keys.google,
		callbackURL: '/auth/google/redirect'
	}, (accessToken, refreshToken, profile, done) => {
		//check if user exists

		User.findOne({ googleId: profile.id})
		  .then((currentUser) => {
		  	if(currentUser) {
		  		//already have the user
		  		console.log('user is: ', currentUser);
		  		done(null, currentUser);
		  	} else {
		  		//if not, create user in db
					new User({
						username: profile.displayName,
						googleId: profile.id
					}).save()
					  .then((newUser) => {
					  	console.log('new user created: ' + newUser);
					  	done(null, newUser);
					  });
		  	}
		  });
	})
);
