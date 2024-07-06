const { Router } = require("express");
const getNotification = require("./controller/notification");
const router = Router();

router.route("/").get(getNotification);

module.exports = router;
