const { Router } = require("express");
const findMode = require("./controller/mode");
const router = Router();

router.route("/").get(findMode);

module.exports = router;
