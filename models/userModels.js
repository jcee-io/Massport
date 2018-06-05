const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  googleId: String,
  facebookId: String,
  twitterId: String,
  githubId: String,
  localHash: String,
  email: String,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('user', userSchema);

module.exports = User;
