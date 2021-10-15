const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstname: { 
    type: String,
    required: true 
  },
  lastname: { 
    type: String, 
    required: true 
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  notifications: [],
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
