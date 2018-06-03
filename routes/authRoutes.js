const router = require('express').Router();
const passport = require('passport');

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

router.get('/logout', (req,res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/google', isLoggedIn, passport.authenticate('google'));

router.get('/google/redirect', passport.authenticate('google', failureRedirect), redirectToSecret);

router.get('/facebook', isLoggedIn, passport.authenticate('facebook'));

router.get('/facebook/redirect', passport.authenticate('facebook', failureRedirect), redirectToSecret);

router.get('/github', isLoggedIn, passport.authenticate('github'));

router.get('/github/redirect', passport.authenticate('github', failureRedirect), redirectToSecret);

router.get('/status', (req, res) => {
  let isLoggedIn = false;
  console.log(req.user);
  if(req.user) {
    isLoggedIn = true;
  }

  res.json({ isLoggedIn, user: req.user || null });
});
module.exports = router;
