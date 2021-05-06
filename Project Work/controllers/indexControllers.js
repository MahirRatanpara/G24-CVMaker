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

const giveCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
};

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
        res.json({
          sucess: false,
          data: null,
          error: errors,
        });
      } else {
        if (errors.length > 0) {
          res.json({
            sucess: false,
            data: null,
            error: errors,
          });
        } else {
          // creating a new user instance
          const newUserInstance = new User({
            username: req.body.username,
            password: req.body.password,
            gender: req.body.gender,
            full_name: req.body.full_name,
            securityQuestion: req.body.securityQ,
            securityAnswer: req.body.securityAns,
            isAdmin: false,
            created: giveCurrentDate(),
          });
          bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(newUserInstance.password, salt, (err1, hash) => {
              if (err1) throw err1;
              newUserInstance.password = hash;
              newUserInstance
                .save()
                .then((result) => {
                  res.json({
                    success: true,
                    data: {
                      msg: "You are successfully registered",
                      redirect: "dashboard.html",
                    },
                    error: null,
                  });
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
    console.log({ err, user });
    if (err) return res.json(err);
    if (!user) return res.sendStatus(401).json();

    // Making a jwt token signed with user information
    const accessToken = jwt.sign(
      { username: user.username, id: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      data: {
        accessToken,
      },
      error: null,
    });
  })(req, res, next);
};

const logout_get = (req, res, next) => {
  // user must be already logged in(option to logout only available if the user is logged in-ensured at frontend)
  res.json({
    success: true,
    data: {
      msg: "You are logged out",
      redirect: "/",
    },
    error: null,
  });
};

const profile_get = (req, res, next) => {
  console.log("here: ", req.user);
  User.findOne({
    username: req.user?.username || req.user?.emails[0].value.slice(0, -10),
  })
    .then((data) => {
      console.log({ data });
      if (!data) throw new Error();
      const fallbackImageURL =
        "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";
      const objToSend = {
        username: data.username,
        isAdmin: data.isAdmin,
        dateRegistered: data.dateRegistered,
        photoURL:
          (req.user && req.user.photos && req.user.photos[0].value) ||
          fallbackImageURL,
        gender: data.gender,
        full_name: data.full_name,
        googleId: data.googleId,
      };
      console.log({ objToSend });
      res.json({
        success: true,
        data: {
          user: objToSend,
        },
        error: null,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500).json();
    });
};

const profile_post = (req, res, next) => {
  User.findOneAndUpdate(
    { username: req.user?.username || req.user?.emails[0].value.slice(0, -10) },
    { ...req.body },
    { new: true }
  )
    .then((data) => {
      if (!data)
        res.json({
          sucess: false,
          data: null,
          error: {
            msg: "User doesn't exist",
          },
        });

      res.json({
        success: true,
        data: {},
        error: null,
      });
    })
    .catch((err) => console.log(err));
};

const profile_delete = (req, res, next) => {
  const { id } = req.user;
  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data)
        res.json({
          sucess: false,
          data: null,
          error: {
            msg: "User doesn't exist",
          },
        });
      res.json({
        success: true,
        data: {},
        error: null,
      });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  register_post,
  login_post,
  logout_get,
  profile_get,
  profile_post,
  profile_delete,
};
