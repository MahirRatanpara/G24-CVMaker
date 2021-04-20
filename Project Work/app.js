// express related
const express = require("express");
const app = express();
const indexRoutes = require("./routes/indexRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const resumeRoutes = require("./routes/resumeRoutes");
const trafficRoutes = require("./routes/trafficRoutes");

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

const corsOptions = {
  // origin: "https://g24-cvmaker-frontend.vercel.app",
  credentials: true,
};

// enable all cors requests
app.use(cors(corsOptions));
app.use("*", function (req, res, next) {
  //replace localhost:8080 to the ip address:port of your server
  // res.header(
  //   "Access-Control-Allow-Origin",
  //   "https://g24-cvmaker-frontend.vercel.app"
  // );
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  console.log(req.headers);
  next();
});
app.options("*", cors()); // include before other routes
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
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", indexRoutes);
app.use("/api/users", adminRoutes);
app.use("/api/resumeData/", resumeRoutes);
app.use("/api/traffic", trafficRoutes);
app.use(express.static("client"));

app.get("/", (req, res, next) => {
  res.json("hello there");
});
