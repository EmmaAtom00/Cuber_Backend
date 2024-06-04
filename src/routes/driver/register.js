const { Router } = require("express");
const register = require("./controller/register");
const router = Router();

router.route("/").post(register);

module.exports = router;
