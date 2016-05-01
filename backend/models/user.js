'use strict';

const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type:String, required:true, unique:true },
  password: String,
  lists:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
});

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(20));
  next();
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password, bcrypt.genSaltSync(10));
};

userSchema.methods.generateToken = function() {
  return jwt.sign({ _id: this._id }, process.env.JWT_TOKEN_SECRET || '11235813');
};

module.exports = mongoose.model('User', userSchema);
