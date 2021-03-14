// express related
const express = require("express");

// mongoose related
const mongoose = require("mongoose");
const User = require("../models/User.js");

// bcrypt related
const bcryptjs = require("bcryptjs");

// jwt related
const jwt = require("jsonwebtoken");

// passport related
const passport = require("passport");

const register_post = (req, res, next) => {
  // check if the user with same username already exists
  // if no then send success message and add user to db else send failure message
  const user = { username: req.body.username, password: req.body.password };
  let errors = [];
  if (req.body.password !== req.body.password2) {
    errors.push("Passowrds don't match");
  }
  if (req.body.password.length < 6) {
    errors.push("Password must be of atleast 6 characters");
  }
  //   Check if some user with same username already exists ot noy
  User.find({ username: req.body.username })
    .then((result) => {
      if (result.length > 0) {
        errors.push("The username is taken");
        res.json(JSON.stringify(errors));
      } else {
        if (errors.length > 0) {
          res.json(JSON.stringify(errors));
        } else {
          // creating a new user instance
          const newUserInstance = new User({
            username: req.body.username,
            password: req.body.password,
          });
          bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(newUserInstance.password, salt, (err1, hash) => {
              if (err1) throw err1;
              newUserInstance.password = hash;
              newUserInstance
                .save()
                .then((result) => {
                  res.json({ msg: "You are successfully registered" });
                })
                .catch((err2) => console.error(err2));
            });
          });
        }
      }
    })
    .catch((err) => console.error(err));
};

const login_post = (req, res, next) => {
  // check is the username is registered or not?

  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return res.send(err);
    if (!user) return res.sendStatus(401);

    // Making a jwt token signed with user information
    const accessToken = jwt.sign(
      { username: user.username, id: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({ accessToken });
  })(req, res, next);
};

const logout_post = (req, res, next) => {
  // user must be already logged in(option to logout only available if the user is logged in-ensured at frontend)
  res.json({
    msg: "You are logged out",
    redirect: "/",
  });
};

module.exports = { register_post, login_post, logout_post };
