const { Router } = require("express");
const active = require("./controller/active");
const router = Router();

router.route("/").get(active);

module.exports = router;
