const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const googleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");

//! Configure passport to use the local strategy
passport.use(
    new LocalStrategy(async (username, password, done) => {
        const user = await User.findOne({ username: username });
        if (!user) return done(null, false, { message: "Incorrect username." });
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(err);
            if (!isMatch) return done(null, false, { message: "Incorrect password." });
            return done(null, user);
        });
    })
);

//! Configure passport to use the google login strategy
passport.use(
    new googleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRECT,
            callbackURL: "http://localhost:3000/api/auth/google/callback",
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            //! find a user
            let user = await User.findOne({ email: profile.emails[0].value });
            if (!user) {
                user = await User.create({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    password: require("crypto").randomBytes(20).toString("hex"),
                });
            }
            return done(null, user);
        }
    )
);

//! Configure passport to use the facebook login strategy
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRECT,
            callbackURL: "http://localhost:3000/api/auth/facebook/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            //! find a user
            let user = await User.findOne({ username: profile.displayName });
            if (!user) {
                user = await User.create({
                    username: profile.displayName,
                    email: profile.emails[0].value || profile.id,
                    password: require("crypto").randomBytes(20).toString("hex"),
                });
            }
            return done(null, user);
        }
    )
);

//! Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

//! check if the user is authenticated
passport.isAuth = function (req, res, next) {
    //! if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }
    //! if the user is not signed in
    return res.status(400).json({ message: "Not Authenticated" });
};

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //! req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;
