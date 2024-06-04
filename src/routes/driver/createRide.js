const { Router } = require("express");
const createRide = require("./controller/createRide");
const router = Router();

router.route("/").post(createRide);

module.exports = router;
