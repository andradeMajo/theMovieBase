const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
  });

  module.exports= Users = mongoose.model('Users', userSchema);
 