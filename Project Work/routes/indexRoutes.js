// express related
const express = require("express");
const router = express.Router();

// dotenv related
const dotenv = require("dotenv");
dotenv.config({ path: "./.env", encoding: "utf-8" });

// passport related
const passport = require("passport");

// controllers
const {
  index_get,
  register_post,
  login_post,
  logout_post,
  security_check,
} = require("../controllers/indexControllers");

router.post("/register", register_post);

router.post("/login", login_post);

router.post("/logout", logout_post);

router.post(
  "/securityCheck",
  passport.authenticate("jwt", { session: false }),
  security_check
);

module.exports = router;
