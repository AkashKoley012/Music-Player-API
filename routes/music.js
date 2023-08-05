const { music } = require("../controllers/music");

const router = require("express").Router();

router.post("/music", music);

module.exports = router;
