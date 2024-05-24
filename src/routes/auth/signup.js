const { Router } = require("express");
const signUpController = require("./controller/signupctrl");
const router = Router();

router.route("/").post(signUpController);

module.exports = router;
