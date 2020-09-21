// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
const cookieSession = require('cookie-session');
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

//++++NEED TO ADD OUR OWN ROUTES HERE+++++
const storyRoutes = require("./routes/stories-router")
const usersRoutes = require("./routes/users-router");
const loginRoutes = require("./routes/login-router");
// const storiesRoutes = require("./routes/stories-router");
// const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

//++++ASK MENTOR ABOUT API REFERENCE+++++
app.use("/stories", storyRoutes);
app.use("/users", usersRoutes);
app.use("/login", loginRoutes);

// app.use("/login", loginRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("login");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
