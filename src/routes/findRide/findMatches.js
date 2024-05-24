const { Router } = require("express");
const findM = require("./controller/findMatches");
const router = Router();

router.route("/").post(findM);

module.exports = router;
