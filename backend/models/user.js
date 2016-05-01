'use strict';

const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, 
  password: { type: String, required: true },
  email:    { type: String, required: true },
  lists:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
});

userSchema.methods.hashPassword = function(password) {
  
};

userSchema.methods.comparePassword = function(password) {
  
};

userSchema.methods.generateToken = function() {
  
};

module.exports = mongoose.model('User', userSchema);
