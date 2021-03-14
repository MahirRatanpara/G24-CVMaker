// express related
const express = require("express");
const app = express();

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

app.use(morgan("tiny")); //logging framework

// connecting node.js app with database
const dbURI = process.env.DBURI;
console.log(typeof dbURI);
mongoose
  .connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.error({ err }));