const { Router } = require("express");
const selectLocation = require("./controller/selectLocation");
const router = Router();

router.route("/").post(selectLocation);

module.exports = router;
