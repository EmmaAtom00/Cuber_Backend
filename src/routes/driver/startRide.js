const startRide = require("./controller/startRide");

const router = require("express").Router();
router.route("/").get(startRide);

module.exports = router;
