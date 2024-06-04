const { Router } = require("express");
const getDriverLocation = require("./controller/driverLocation");
const router = Router();

router.route("/").post(getDriverLocation);

module.exports = router;
