// express related
const express = require("express");

// mongoose related
const mongoose = require("mongoose");
const User = require("../models/User.js");
const Resume = require("../models/Resume.js");

// bcrypt related
const bcryptjs = require("bcryptjs");

// jwt related
const jwt = require("jsonwebtoken");

// passport related
const passport = require("passport");

const giveCurrentDate = (today) => {
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
};

const getDaysArray = (start, end) => {
  let arr = [],
    dt;
  for (dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr.map((v) => giveCurrentDate(v));
};

const traffic_get = async (req, res, next) => {
  // check if user has admin access
  User.findOne({
    username: req.user?.username || req.user?.emails[0].value.slice(0, -10),
  })
    .then(async (data) => {
      if (!data) new Error();

      if (!data.isAdmin) return res.sendStatus(403).json();

      // user has admin access

      //finding total number of users
      const userData = await User.find();
      const totalUsers = userData.length;

      //finding number of cvs updated or created today
      const resumesData = await Resume.find({
        updated: giveCurrentDate(new Date()),
      });
      const cvsUpdatedToday = resumesData.length;

      //finding new users registered within last 30 days(inclusive)
      let dt = new Date();
      let dt1 = new Date();
      dt1.setDate(dt1.getDate() - 7);

      const datesArray = getDaysArray(dt1, dt);

      let userDateVise = {};

      for (let i = 0; i < datesArray.length; i++) {
        const currDate = datesArray[i];
        const userData = await User.find({ created: currDate });
        if (!userData.length) continue;
        userDateVise[currDate] = userData.length;
      }

      // finding pick rate of templates
      const totalTemplates = 3;
      const templatePickRate = {};
      for (let i = 0; i < totalTemplates; i++) {
        const resumesData = await Resume.find({ templateType: i });
        templatePickRate[i] = resumesData.length;
      }

      res.json({
        success: true,
        data: {
          totalUsers,
          cvsUpdatedToday,
          userDateVise,
          templatePickRate,
        },
        error: null,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { traffic_get };
