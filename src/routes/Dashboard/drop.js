const drop = require("./controller/drop");

const router = require("express").Router();
router.route("/").get(drop);
module.exports = router;
