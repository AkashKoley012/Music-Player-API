const router = require("express").Router();
const passport = require("passport");
const tryCatch = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.use("/api", tryCatch(require("./music")));
router.use("/api", tryCatch(require("./auth")));
router.use("/api", passport.isAuth, tryCatch(require("./favorites")));
router.use("/api", passport.isAuth, tryCatch(require("./playlist")));
router.use("/api", passport.isAuth, tryCatch(require("./queue")));
router.use("/api", passport.isAuth, tryCatch(require("./user")));

module.exports = router;
