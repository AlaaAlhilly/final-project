const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  followers:[{
    id: String,
    isNotBlocked:Boolean
  }],
  follow:[{
    id:String,
    isNotBlockedMe:Boolean
  }]
});

module.exports = User = mongoose.model('users', UserSchema);
