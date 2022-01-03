const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
