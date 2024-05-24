const { Router } = require("express");
const dashboardController = require("./controller/dashboardCtrl");
const router = Router();

router.route("/").get(dashboardController);

module.exports = router;
