// express related
const express = require("express");

// mongoose related
const mongoose = require("mongoose");
const User = require("../models/User.js");

// jwt related
const jwt = require("jsonwebtoken");

// passport related
const passport = require("passport");
const { all } = require("../routes/indexRoutes.js");

const get_users = (req, res, next) => {
  User.findOne({
    username: req.user?.username || req.user?.emails[0].value.slice(0, -10),
  })
    .then((data) => {
      if (!data) new Error();

      if (!data.isAdmin) return res.sendStatus(403).json();

      User.find()
        .then((allUsers) => {
          return res.json(allUsers);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err1) => {
      console.log(err1);
    });
  // res.json(req.user);
};

const delete_user = (req, res, next) => {
  User.findOne({
    username: req.user?.username || req.user?.emails[0].value.slice(0, -10),
  })
    .then((data) => {
      if (!data) new Error();

      if (!data.isAdmin) return res.sendStatus(403).json();

      const { username } = req.params;
      User.findOneAndDelete({ username })
        .then((deleted) => {
          res.json(deleted);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err1) => {
      console.log(err1);
    });
};

module.exports = { get_users, delete_user };
