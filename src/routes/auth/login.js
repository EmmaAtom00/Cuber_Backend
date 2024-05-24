const { Router } = require("express");
const loginController = require("./controller/login");
const router = Router();

router.route("/").post(loginController).patch(loginController);

module.exports = router;
