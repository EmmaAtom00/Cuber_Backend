const { Router } = require("express");
const protect = require("./controller/protect");
const router = Router();

router.route("/").get(protect);

module.exports = router;
