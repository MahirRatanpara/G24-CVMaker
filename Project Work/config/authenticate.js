const jwt = require("jsonwebtoken");

const getCookies = (req) => {
  // We extract the raw cookies from the request headers
  const rawCookies = req.headers.cookie?.split("; ");

  const parsedCookies = {};
  rawCookies?.forEach((rawCookie) => {
    const parsedCookie = rawCookie.split("=");
    parsedCookies[parsedCookie[0]] = parsedCookie[1];
  });
  return parsedCookies;
};

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token =
    getCookies(req)["token"] || (authHeader && authHeader.split(" ")[1]);
  console.log({ token });
  // If token exists and is valid, store user info in req.user then pass control to next middleware
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      console.log({ decode });
      console.log(err ? "error" : "ok");
      if (!err && decode) {
        req.user = { username: decode.username, id: decode.id };
      }
    });
  }
  next();
};
module.exports = { authenticate };
