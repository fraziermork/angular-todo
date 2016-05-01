'use strict';

const mongoose        = require('mongoose');
const express         = require('express');
const bodyParser      = require('body-parser').json();
const app             = express();

const authMiddleware  = require(__dirname + '/lib/authenticate');
const userRouter      = require(__dirname + '/routes/users');
const loginRouter     = require(__dirname + '/routes/login');
const listRouter      = require(__dirname + '/routes/lists');
const itemRouter      = require(__dirname + '/routes/items');

let APP_PORT          = process.env.APP_PORT || 8080;
let API_PORT          = process.env.API_PORT || 3000;
let DB_PORT           = process.env.MONGOLAB_URI || 'mongodb://localhost/db';




mongoose.connect(DB_PORT);
let db = mongoose.connection;
db.on('error', (err) => {
  console.log('----ERROR CONNECTING WITH MONGOOSE----', err);
});
db.once('open', () => {
  app.use(bodyParser);
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:' + APP_PORT);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });
  
  
  // /*
  // // AUTH NOT NEEDED
  // */
  // ROUTES
  app.use('/users', userRouter);
  app.use('/login', loginRouter);
  
  // /*
  // // AUTH REQUIRED 
  // */
  app.use(authMiddleware);
  // ROUTES 
  app.use('/lists', listRouter);
  app.use('/items', itemRouter);
  app.listen(API_PORT, () => {
    console.log('----API LISTENING ON ' + API_PORT + '----');
    require(__dirname + '/../frontend/server.js')(APP_PORT);
  });
});
