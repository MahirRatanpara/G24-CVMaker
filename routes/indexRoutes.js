// express related
const express = require("express");
const router = express.Router();

// controllers
const {
  index_get,
  register_post,
  login_post,
  logout_post,
} = require("../controllers/indexControllers");

router.post("/register", register_post);

router.post("/login", login_post);

router.post("/logout", logout_post);

module.exports = router;
