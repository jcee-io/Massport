const passport = require('passport');
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

const userIdExists = (currentUser, done, email) => {
	console.log('hello world');
	if(currentUser) {
		//already have the user
		done(null, currentUser);

		return 'resolved';
	} else {
		//if not, create user in db
		return User.findOne({ email });
	}
};

const userEmailExists = (currentUser, UserOptions, done) => {
	console.log('access email');
	if(currentUser) {
		console.log("email already exists.")
		return done(null, false);
	} else if (currentUser !== 'resolved') {
		new User(UserOptions).save()
			.then((newUser) => {
				console.log('new user created: ' + newUser);
				done(null, newUser);
			});
	}
}


module.exports = { userIdExists, userEmailExists };
