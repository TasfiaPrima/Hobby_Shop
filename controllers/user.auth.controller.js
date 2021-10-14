const express = require('express');
const User = require("../models/user.model");
const auth = require('../middleware/auth');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const postLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      success: false,
      message: "All fields are required!",
    });
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(401).json({
      success: false,
      message: "No such user exists!",
    });
  } else {
    const user = await bcrypt.compare(password, existingUser.password)
    .then(user => {
      if(!user) return res.status(400).json({ msg: 'Password did not match!'});

      jwt.sign(
          { id: user._id },
          process.env.jwtSecret,
          { expiresIn: 3600 },
          (err, token) => {
              if(err) throw err;
              res.json({
                  token,
                  user: existingUser
              });
          }
      );
  });
  }
};

const postRegister = (req, res) => {
  const { firstname, lastname, email, password, confirm_password } = req.body;

  if (!firstname || !lastname || !email || !password || !confirm_password) {
    return res.status(401).json({
      success: false,
      message: " All fields are required!",
    });
  }

  if (password.length < 8) {
    return res.status(401).json({
      success: false,
      message: " Password must be at least 6 characters!",
    });
  }
  if (password !== confirm_password) {
    return res.status(401).json({
      success: false,
      message: " Passwords do not match. Please try again",
    });
  }

  //Create New User
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(500).json({
        success: false,
        message: "User already exists with this email",
      });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "problem with generating salt",
          });
        } else {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "problem with hashing",
              });
            } else {
              const newUser = new User({
                firstname,
                lastname,
                email,
                password: hash,
              });

              newUser
                .save()
                .then(user => {
                  jwt.sign(
                      { id: user._id },
                      process.env.jwtSecret,
                      { expiresIn: 3600 },
                      (err, token) => {
                          if(err) throw err;
                          res.json({
                              token,
                              user: {
                                  message: " User created",
                                  id: user._id,
                                  name: user.name,
                                  email: user.email
                              }
                          });
                      });
              })
                .catch((err) => {
                  return res.status(500).json({
                    success: false,
                    message: "User Creation Failed",
                  });
                });
            }
          });
        }
      });
    }
  });
};


const updateNotifications=async(req,res) => {
let user
try{
user=await User.findById(req.params.userId);
}catch(err) {
  console.log(err);
  res.status(500).send("Something went wrong");
}
console.log(user.notifications);
user.notifications.forEach((notification) => {
  notification.seen = true;
});
console.log(user.notifications);

try{
  user.markModified('notifications')
  await user.save()
  }catch(err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
  console.log(user.notifications);
  console.log(user);

  return res.status(200).json({ success:true, message:'Notification seen' });

}

module.exports = {
  postRegister,
  postLogin,
  updateNotifications,
};
