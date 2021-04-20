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

const { traffic_get } = require("../controllers/trafficControllers.js");

router.get("/", authenticate, checkUserLoggedIn, traffic_get);

module.exports = router;
