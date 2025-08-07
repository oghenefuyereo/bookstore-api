const express = require('express');
const passport = require('passport');
const router = express.Router();

// Helper to get first name
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
  res.json({ message: `Welcome, ${firstName}!`, user: req.user });
});

// GitHub OAuth login
router.get('/github', passport.authenticate('github', {
  scope: ['user:email']
}));

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/'
}), (req, res) => {
  const firstName = getFirstName(req.user.name);
  res.json({ message: `Welcome, ${firstName}!`, user: req.user });
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.send('Logged out');
  });
});

module.exports = router;
