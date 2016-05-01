'use strict';

const express = require('express');
const User    = require(__dirname + '/../models/user.js');

let router    = express.Router();


router.get('/', (req, res) => {
  User.findOne({ username: req.basicHttpAuth.username }, (err, user) => {
    if (err) {
      res.status(401).json({ status: 'failure', message: 'Server error.' });
    } else if (!user) {
      res.status(404).json({ status: 'failure', message: 'Error logging you in.'});
    } else {
      if (!user.comparePassword(req.basicHttpAuth.password)) {
        return res.status(404).json({ status: 'failure', message: 'Error logging you in.' });
      } else {
        return res.status(200).json({ token: user.generateToken() });
      }
    }
  });
});


module.exports = router;
