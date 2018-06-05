const router = require('express').Router();
const passport = require('passport');
const User = require('../models/userModels');

const failureRedirect = {
  failureRedirect: '/error/exists'
};

const redirectToSecret = (req, res) => res.redirect('/user');

const isLoggedIn = (req, res, next) => {
  if(req.user) {
    res.redirect('/user');
  } else {
    next();
  }
};

router.get('/login', isLoggedIn);

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


router.post('/signup/create', (req, res) => {
  const { username, password, email } = req.body;

  User.findOne({ email })
    .then((currentUser) => {
      if(currentUser) {
        console.log('user exists');
        res.redirect('/error/exists');
      } else {
        console.log('user does not exist');
        User.register({ username, email }, password)
          .then((user) => {
            passport.authenticate('local', failureRedirect)(req, res, () => {
              res.redirect('/user');
            });
          });
        res.redirect('/');
      }
    });
});

router.post('/local', passport.authenticate('local', failureRedirect), redirectToSecret);

router.get('/google', isLoggedIn, passport.authenticate('google'));

router.get('/google/redirect', passport.authenticate('google', failureRedirect), redirectToSecret);

router.get('/facebook', isLoggedIn, passport.authenticate('facebook'));

router.get('/facebook/redirect', passport.authenticate('facebook', failureRedirect), redirectToSecret);

router.get('/github', isLoggedIn, passport.authenticate('github'));

router.get('/github/redirect', passport.authenticate('github', failureRedirect), redirectToSecret);

router.get('/status', (req, res) => {
  let isLoggedIn = false;
  if(req.user) {
    isLoggedIn = true;
  }

  res.json({ isLoggedIn, user: req.user || null });
});
module.exports = router;
