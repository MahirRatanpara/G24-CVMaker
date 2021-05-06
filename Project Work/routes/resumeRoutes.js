// express related
const express = require("express");
const router = express.Router();

// bcrypt related
const bcryptjs = require("bcryptjs");

// dotenv related
const dotenv = require("dotenv");
dotenv.config({ path: "./.env", encoding: "utf-8" });

// passport related
const passport = require("passport");
const {
  authenticate,
  checkUserLoggedIn,
} = require("../config/authenticate.js");

const Resume = require("../models/Resume.js");
const User = require("../models/User.js");
const { json } = require("express");

const {
  get_resume,
  new_resume,
  edit_resume,
} = require("../controllers/resumeControllers.js");

router.get("/:resumeID", authenticate, checkUserLoggedIn, get_resume);

router.post("/:resumeID", authenticate, checkUserLoggedIn, edit_resume);

router.post("/", authenticate, checkUserLoggedIn, new_resume);

module.exports = router;
