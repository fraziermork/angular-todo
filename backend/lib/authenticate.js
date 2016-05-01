'use strict';

const User    = require(__dirname + '/../models/user.js');

function zeroBuffer(buf) {
  for( let i = 0; i < buf.length; i++ ) {
    buf.writeUInt8(0, i);
  }
}

function authenticate(req, res, next) {
  try {
    // PROCESS INCOMING HEADERS
    let authString      = req.headers.authorization;
    let base64String    = authString.split(' ')[1];
    let authBuffer      = new Buffer(base64String, 'base64');
    let utf8AuthString  = authBuffer.toString();
    let authArray       = utf8AuthString.split(':');
    zeroBuffer(authBuffer);
    let username        = authArray[0];
    let password        = authArray[1];
    
    // TACK ON USERNAME AND PASSWORD
    if (username.length && password.length) {
      req.basicHttpAuth = {
        username: username,
        password: password
      };
      return next();
    } else {
      throw new Error('Username or password not supplied.');
    }
  } catch (err) {
    console.log('ERROR AUTHENTICATING: ', err);
    res.status(401).json({ status: 'failure', message: 'Could not authenticate.' });
  }
}

module.exports = authenticate;
