const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/api/users');
});

router.get('/logout', (req, res) => {
  req.logout(() => res.send('Logged out'));
});

module.exports = router;
