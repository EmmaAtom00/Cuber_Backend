const acceptedRide = require("./controller/acceptedRide");

const router = require("express").Router();

router.route("/").get(acceptedRide);

module.exports = router;
