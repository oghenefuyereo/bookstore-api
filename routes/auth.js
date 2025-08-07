const express = require('express');
const passport = require('passport');
const router = express.Router();

// Helper to get first name from full name string
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

// Logout route with personalized message
router.get('/logout', (req, res, next) => {
  if (!req.user) {
    // If no user is logged in
    return res.send('You are not logged in');
  }
  const firstName = getFirstName(req.user.name);

  req.logout(err => {
    if (err) return next(err);
    res.send(`${firstName}, you have successfully logged out`);
  });
});

module.exports = router;
