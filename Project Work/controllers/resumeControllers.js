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

const giveCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
};

const get_resume = (req, res, next) => {
  const { resumeID } = req.params;
  Resume.findById(resumeID)
    .then((resumeData) => {
      User.findById(resumeData["user"])
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      res.json({
        success: true,
        data: {
          resumeData,
        },
        error: null,
      });
    })
    .catch((err) => console.log(err));
};

const new_resume = async (req, res, next) => {
  const resumeData = { ...req.body };
  const resumeDataKeys = Object.keys(resumeData);
  const attributes = Object.keys(Resume.schema.paths);
  let obj1 = {};
  let otherObj = {};

  resumeDataKeys.forEach((key) => {
    if (attributes.indexOf(key) != -1) {
      Object.defineProperty(obj1, key, { value: resumeData[key] });
    } else {
      Object.defineProperty(otherObj, key, { value: resumeData[key] });
    }
  });

  const newResumeInstance = new Resume({
    fullName: obj1?.fullName || "",
    institute: obj1?.institute || "",
    email: obj1?.email || "",
    DOB: obj1?.DOB || Date.now(),
    address: obj1?.address || "",
    education: obj1?.education || [],
    expertiseArea: obj1?.expertiseArea || "",
    programmingLanguage: obj1?.programmingLanguage || "",
    toolsAndTechnology: obj1?.toolsAndTechnology || "",
    technicalElective: obj1?.technicalElective || "",
    interships: obj1?.interships || [],
    projects: obj1?.projects || [],
    positionOfResponiblity: obj1?.positionOfResponiblity || [],
    intrestAndHobbies: obj1?.intrestAndHobbies || [],
    achievements: obj1?.achievements || [],
    templateType: obj1?.templateType || 0,
    others: otherObj,
    created: giveCurrentDate(),
    updated: giveCurrentDate(),
  });
  newResumeInstance.user = mongoose.Types.ObjectId(req.user.id);
  const currUser = await User.findById(req.user.id);
  currUser.resumes.push(newResumeInstance);
  await currUser.save();
  console.log(req.user);
  try {
    const data = await newResumeInstance.save();
    console.log(data);
    res.json({
      success: true,
      data: {
        msg: "Saved Succesfully",
      },
      error: null,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json();
  }
};

const edit_resume = async (req, res, next) => {
  const { resumeID } = req.params;
  const resumeData = { ...req.body };
  const resumeDataKeys = Object.keys(resumeData);
  const attributes = Object.keys(Resume.schema.paths);
  let obj1 = {};
  let otherObj = {};

  resumeDataKeys.forEach((key) => {
    if (attributes.indexOf(key) != -1) {
      Object.defineProperty(obj1, key, { value: resumeData[key] });
    } else {
      Object.defineProperty(otherObj, key, { value: resumeData[key] });
    }
  });

  try {
    const updatedResumeInstance = await Resume.findByIdAndUpdate(
      resumeID,
      {
        fullName: obj1?.fullName || "",
        institute: obj1?.institute || "",
        email: obj1?.email || "",
        DOB: obj1?.DOB || Date.now(),
        address: obj1?.address || "",
        education: obj1?.education || [],
        expertiseArea: obj1?.expertiseArea || "",
        programmingLanguage: obj1?.programmingLanguage || "",
        toolsAndTechnology: obj1?.toolsAndTechnology || "",
        technicalElective: obj1?.technicalElective || "",
        interships: obj1?.interships || [],
        projects: obj1?.projects || [],
        positionOfResponiblity: obj1?.positionOfResponiblity || [],
        intrestAndHobbies: obj1?.intrestAndHobbies || [],
        achievements: obj1?.achievements || [],
        templateType: obj1?.templateType || 0,
        others: otherObj,
        updated: giveCurrentDate(),
      },
      { new: true }
    );

    console.log(updatedResumeInstance);
    res.json({
      success: true,
      data: {
        msg: "Saved Succesfully",
      },
      error: null,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json();
  }
};

module.exports = { get_resume, new_resume, edit_resume };
