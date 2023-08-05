const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const db = require("./config/mongoose");
const passport = require("passport");
const passportLocal = require("./config/passport-strategy");

const app = express();
const port = 3000;

//! Middleware to parse JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("common"));
app.use(cookieParser());

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        secret: process.env.SECRECT,
        store: new MongoStore({ mongoUrl: process.env.DB }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

//! Define the music endpoint
app.use("/", require("./routes"));

//! catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

//! error handler
app.use(function (err, req, res, next) {
    return res.status(err.status || 500).json({ message: err.message });
});

//! Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
