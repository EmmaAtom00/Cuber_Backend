const completeRide = require("./controller/completeRide");

const router = require("express").Router();
router.route("/").get(completeRide);
module.exports = router;
