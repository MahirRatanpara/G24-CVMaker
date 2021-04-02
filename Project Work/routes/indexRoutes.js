// express related
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

// controllers
const {
  index_get,
  register_post,
  login_post,
  logout_post,
  security_check,
  profile_get,
  profile_post,
  profile_delete,
} = require("../controllers/indexControllers");

// local authn routes
router.post("/register", register_post);

router.post("/login", login_post);

router.post("/logout", logout_post);

router.post(
  "/securityCheck",
  passport.authenticate("jwt", { session: false }),
  security_check
);

// oauth routes
router.get("/login/auth/google/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/login/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res, next) => {
    next();
  }
);

router.get(
  "/login/auth/google/callback",
  passport.authenticate("google"),
  (req, res, next) => {
    res.json({ msg: "You reached the callback URI" });
  }
);

// router.get(
//   "/profile",
//   checkUserLoggedIn,
//   passport.authenticate("jwt", { session: false }),
//   profile_get
// );

router.get("/profile", authenticate, checkUserLoggedIn, profile_get);

router.post("/profile", authenticate, checkUserLoggedIn, profile_post);

router.delete("/profile", authenticate, checkUserLoggedIn, profile_delete);

module.exports = router;
