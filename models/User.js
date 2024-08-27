const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  qualifications: String,
  resume: String,
  password: String, // Added password field
});

const User = mongoose.model('User', userSchema);

module.exports = User;
