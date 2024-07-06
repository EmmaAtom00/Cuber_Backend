const { Router } = require("express");
const getInbox = require("./controller/inbox");
const router = Router();

router.route("/").get(getInbox);

module.exports = router;
