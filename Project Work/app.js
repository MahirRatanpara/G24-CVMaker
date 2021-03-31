// express related
const express = require("express");
const app = express();
const indexRoutes = require("./routes/indexRoutes.js");
const session = require("express-session");

const path = require("path");
const morgan = require("morgan");

// cors related
const cors = require("cors");

// dotenv related
const dotenv = require("dotenv");
dotenv.config({ path: "./.env", encoding: "utf-8" });

// mongoose related
const mongoose = require("mongoose");

// bcrypt related
const bcryptjs = require("bcryptjs");

// jwt related
const jwt = require("jsonwebtoken");

// passport related
const passport = require("passport");
require("./config/passport-config.js")(passport);

app.use(morgan("dev")); //logging framework

// enable all cors requests
app.use(cors());

// connecting node.js app with database
const dbURI = process.env.DBURI;
mongoose
  .connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.error({ err }));

app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true,
    maxAge: 24 * 60 * 60,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", indexRoutes);

app.get("/", (req, res, next) => {
  res.json("hello there");
});
