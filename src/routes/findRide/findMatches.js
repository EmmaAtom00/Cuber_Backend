const { Router } = require("express");
const findM = require("./controller/findMatches");
const router = Router();

router.route("/").get(findM);

module.exports = router;
