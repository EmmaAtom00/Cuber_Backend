const { Router } = require("express");
const refreshToken = require("./controller/refreshToken");
const router = Router();

router.route("/").get(refreshToken);

module.exports = router;
