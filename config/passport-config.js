// passport-local related
const passportLocal = require("passport-local");
const LocalStrategy = passportLocal.Strategy;

// passport-jwt related
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// bcrypt related
const bcryptjs = require("bcryptjs");

// mongoose related
const User = require("../models/User.js");

// dotenv related
const dotenv = require("dotenv");
dotenv.config({ path: "./.env", encoding: "utf-8" });

function myLocalStrategy(username, password, done) {
  // verify email
  User.find({ username: username })
    .then((result) => {
      result = result[0];
      if (!result) {
        return done(null, false, {
          message: "This username is not registered",
        });
      }
      // verify password

      bcryptjs
        .compare(password, result.password)
        .then((isMatch) => {
          if (isMatch) {
            return done(null, result);
          } else {
            return done(null, false, { message: "Invalid password" });
          }
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

function myJWTStrategy(jwtPayload, done) {
  // using this callback function passport attaches the payload to req.user
  return done(null, jwtPayload);
}

function passportInit(passport) {
  // mount our local straggy to passport
  passport.use(
    new LocalStrategy({ usernameField: "username" }, myLocalStrategy)
  );

  // jwtFromRequest (REQUIRED) Function :that accepts a request as the only parameter and returns either the JWT as a string or null
  // jwt_payload is an object literal containing the decoded JWT payload.
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      },
      myJWTStrategy
    )
  );
}
// By default, if authentication fails, Passport will respond with a 401 Unauthorized status, and any additional route handlers will not be invoked

module.exports = passportInit;
