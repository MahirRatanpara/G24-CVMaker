// express related
const express = require("express");

// mongoose related
const mongoose = require("mongoose");
const User = require("../models/User.js");

// bcrypt related
const bcryptjs = require("bcryptjs");

const username_post = (req, res, next) => {
  const { username } = req.body;
  User.findOne({ username })
    .then((result) => {
      console.log({ result });
      if (!result) {
        res.json({
          sucess: false,
          data: null,
          error: {
            msg: "User doesn't exist",
          },
        });
      } else {
        res.json({
          success: true,
          data: {
            securityQuestion: result.securityQuestion,
          },
          error: null,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500), json();
    });
};

const securityCheck_post = (req, res, next) => {
  const { securityAnswer } = req.body;
  const { username } = req.params;
  User.findOne({ username })
    .then((result) => {
      if (!result) {
        res.json({
          sucess: false,
          data: null,
          error: {
            msg: "User doesn't exist",
          },
        });
      } else {
        //user exists, check security answer
        if (securityAnswer == result.securityAnswer) {
          res.json({
            success: true,
            data: {
              redirect: `/password/:${username}`,
            },
            error: null,
          });
        } else {
          res.json({
            sucess: false,
            data: null,
            error: {
              msg: "Invalid security answer",
            },
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500), json();
    });
};

const password_post = (req, res, next) => {
  const { username } = req.params;
  const { password } = req.body;

  if (!password || password.length < 6) {
    return res.json({
      sucess: false,
      data: null,
      error: {
        msg: "Password must be of atleast 6 characters",
      },
    });
  }

  let hashedPassword = "";
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(password, salt, (err1, hash) => {
      if (err1) {
        console.log(err1);
        res.sendStatus(500), json();
      } else {
        hashedPassword = hash;
        User.findOneAndUpdate(
          { username },
          { password: hashedPassword },
          { new: true }
        )
          .then((result) => {
            if (!result) {
              res.json({
                sucess: false,
                data: null,
                error: {
                  msg: "User doesn't exist",
                },
              });
            } else {
              //user exists, updated password in schema
              res.json({
                success: true,
                data: {},
                error: null,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(500), json();
          });
      }
    });
  });
};

module.exports = { username_post, securityCheck_post, password_post };
