// passport-local related
const passportLocal = require("passport-local");
const LocalStrategy = passportLocal.Strategy;

// passport-oauth related
const GoogleStrategy = require("passport-google-oauth20");

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

const oauthStrategyOptions = {
  // options for google strat.
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:
    "https://g24-cvmaker-preview.herokuapp.com/api/login/auth/google/callback",
  // "/api/login/auth/google/callback",
};

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

  // mount our oauth strategy
  passport.use(
    new GoogleStrategy(
      oauthStrategyOptions,
      (request, accessToken, refreshToken, profile, done) => {
        // passport callback function
        // console.log(profile);

        // check if the user already exists in out db
        User.findOne({ googleId: profile.id })
          .then((result) => {
            // console.log(result);
            if (result) {
              // user already exists
              // console.log("here:", result);
            } else {
              //   create a new user from the 'profile' info
              const newUserInstance = new User({
                username: profile.emails[0].value.slice(0, -10),
                googleId: profile.id,
                isAdmin: false,
                full_name: profile.displayName,
              });
              newUserInstance
                .save()
                .then((result) => {
                  // console.log("new user created:", result);
                })
                .catch((err) => console.error(err));
            }
          })
          .catch((err) => console.error(err));

        return done(null, profile);
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
}
// By default, if authentication fails, Passport will respond with a 401 Unauthorized status, and any additional route handlers will not be invoked

module.exports = passportInit;
