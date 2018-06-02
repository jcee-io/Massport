const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res, next) => {
  if(req.user) {
    res.redirect('/user');
  }
  next();
});

router.get('/logout', (req,res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google', {
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/user');
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/redirect', passport.authenticate('facebook',{
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/user');
});

router.get('/github', passport.authenticate('github', {
  scope: ['user:email']
}));

router.get('/github/redirect', passport.authenticate('github', {
  failureRedirect: '/login'
}), (req, res) => {
  res.redirect('/user');
});

router.get('/status', (req, res) => {
  let isLoggedIn = false;
  console.log(req.user);
  if(req.user) {
    isLoggedIn = true;
  }

  res.json({ isLoggedIn, user: req.user || null });
});
module.exports = router;
