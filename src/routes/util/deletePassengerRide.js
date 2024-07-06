const { Router } = require("express");
const deletePassengerRide = require("./controls/deletePassengerRide");
const router = Router();

router.route("/").get(deletePassengerRide);

module.exports = router;
