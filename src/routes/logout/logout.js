const { Router } = require("express");
const logoutController = require("./logoutController/logoutCtrl");
const router = Router();

router.route("/").get(logoutController);

module.exports = router;
