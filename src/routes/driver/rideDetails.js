const rideDetails = require("./controller/rideDetails");

const router = require("express").Router();

router.route("/").get(rideDetails);

module.exports = router;
