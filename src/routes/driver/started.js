const started = require("./controller/started");

const router = require("express").Router();
router.route("/").get(started);
module.exports = router;
