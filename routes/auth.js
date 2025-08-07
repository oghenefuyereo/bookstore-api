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

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/'
}), (req, res) => {
  const firstName = getFirstName(req.user.name);
  res.send(`Welcome ${firstName}, you are logged in`);
});

// GitHub OAuth login
router.get('/github', passport.authenticate('github', {
  scope: ['user:email']
}));

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/'
}), (req, res) => {
  const firstName = getFirstName(req.user.name);
  res.send(`Welcome ${firstName}, you are logged in`);
});

// Logout route
router.get('/logout', (req, res, next) => {
  if (!req.isAuthenticated()) {
    // User not logged in
    return res.send('You are not logged in');
  }

  const firstName = getFirstName(req.user.name);

  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    // After logout, session is destroyed, so user info won't be available
    res.send(`${firstName}, you have successfully logged out`);
  });
});

module.exports = router;
