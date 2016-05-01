'use strict';

const express = require('express');
const User    = require(__dirname + '/../models/user.js');



let router    = express.Router();

router.post('/signUp', (req, res) => {
  let newUser = new User({
    username: req.body.username, 
    password: req.body.password
  });
  newUser.save((err, user) => {
    if (err) {
      res.status(500).json({ status: 'failure' , message: 'Failed to save new user.' });
    } else {
      res.status(200).json({ token: user.generateToken() });
    }
  });
});


module.exports = router;
