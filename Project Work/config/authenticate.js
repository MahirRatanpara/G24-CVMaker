const jwt = require("jsonwebtoken");

const getCookies = (req) => {
  // We extract the raw cookies from the request headers
  const rawCookies = req.headers.cookie?.split("; ");
  const parsedCookies = {};
  console.log({ rawCookies });
  rawCookies?.forEach((rawCookie) => {
    const parsedCookie = rawCookie.split("=");
    parsedCookies[parsedCookie[0]] = parsedCookie[1];
  });
  return parsedCookies;
};

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token =
    (authHeader && authHeader.split(" ")[1]) || getCookies(req)["connect.sid"];
  console.log({ token });
  // If token exists and is valid, store user info in req.user then pass control to next middleware
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      console.log({ decode });
      // console.log(err ? "error" : "ok");
      if (!err && decode) {
        req.user = { username: decode.username, id: decode.id };
      }
    });
  }
  console.log("req.user authenticate fn: ", req.user);

  next();
};

const checkUserLoggedIn = (req, res, next) => {
  // console.log("checkUserLoggedIn:", req.user);
  req.user
    ? next()
    : res.json({
        sucess: false,
        data: null,
        error: {
          code: 403,
          msg: "Login to access resource",
        },
      });
};

module.exports = { authenticate, checkUserLoggedIn };
