const { Router } = require("express");
const approve = require("./controller/approve");
const router = Router();

router.route("/").get(approve);

module.exports = router;
