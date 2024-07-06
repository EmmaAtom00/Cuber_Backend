const { Router } = require("express");
const readNotification = require("./controls/readNotification");
const router = Router();

router.route("/").get(readNotification);

module.exports = router;
