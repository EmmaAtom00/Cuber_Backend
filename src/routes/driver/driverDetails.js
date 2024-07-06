const { Router } = require("express");
const getDriverDetails = require("./controller/driverDetails");
const router = Router();

router.route("/:id").get(getDriverDetails);

module.exports = router;
