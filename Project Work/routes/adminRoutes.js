const express = require("express");
const router = express.Router();

// dotenv related
const dotenv = require("dotenv");
dotenv.config({ path: "./.env", encoding: "utf-8" });

// passport related
const passport = require("passport");
const {
  authenticate,
  checkUserLoggedIn,
} = require("../config/authenticate.js");

const { get_users, delete_user } = require("../controllers/adminControllers");

router.get("/", authenticate, checkUserLoggedIn, get_users);

router.delete("/:username", authenticate, checkUserLoggedIn, delete_user);

module.exports = router;
