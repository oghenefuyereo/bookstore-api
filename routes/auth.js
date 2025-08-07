const express = require('express');
const passport = require('passport');
const router = express.Router();

function getFirstName(fullName) {
  return fullName ? fullName.split(' ')[0] : '';
}

// Google OAuth login
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/');

    // Log in the user and establish session
    req.login(user, (err) => {
      if (err) return next(err);
      const firstName = getFirstName(user.name);
      return res.send(`Welcome ${firstName}, you are logged in`);
    });
  })(req, res, next);
});

// GitHub OAuth login
router.get('/github', passport.authenticate('github', {
  scope: ['user:email']
}));

router.get('/github/callback', (req, res, next) => {
  passport.authenticate('github', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/');

    req.login(user, (err) => {
      if (err) return next(err);
      const firstName = getFirstName(user.name);
      return res.send(`Welcome ${firstName}, you are logged in`);
    });
  })(req, res, next);
});

// Logout route
router.get('/logout', (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.send('You are not logged in');
  }

  const firstName = getFirstName(req.user.name);

  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // clear cookie on logout
      res.send(`${firstName}, you have successfully logged out`);
    });
  });
});

module.exports = router;
