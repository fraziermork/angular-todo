'use strict';

const mongoose        = require('mongoose');
const express         = require('express');
const bodyParser      = require('body-parser').json();
const app             = express();

// const authMiddleware  = require(__dirname + '/lib/authentication');
// const loginRouter     = require(__dirname + '/routes/lists');
// const userRouter      = require(__dirname + '/routes/items');
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
  
  // /*
  // // AUTH NOT NEEDED
  // */
  
  // app.use('/login', loginRouter);
  // app.use(authMiddleware);
  // app.use('/users', userRouter);
  
  // /*
  // // AUTH REQUIRED 
  // */
  
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:' + APP_PORT);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });
  
  app.use('/lists', listRouter);
  app.use('/items', itemRouter);
  app.listen(API_PORT, () => {
    console.log('----API LISTENING ON ' + API_PORT + '----');
    require(__dirname + '/../frontend/server.js')(APP_PORT);
  });
});
