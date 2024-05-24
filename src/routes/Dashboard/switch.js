const { Router } = require("express");
const switchMode = require("./controller/switchCtrl");
const router = Router();

router.route("/").get(switchMode);

module.exports = router;
