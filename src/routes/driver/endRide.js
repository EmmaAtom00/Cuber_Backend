const endRide = require("./controller/endRide");

const router = require("express").Router();
router.route("/").get(endRide);
module.exports = router;
