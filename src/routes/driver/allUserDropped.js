const allUserDropped = require("./controller/allUserDropped");

const router = require("express").Router();

router.route("/").get(allUserDropped);
module.exports = router;
