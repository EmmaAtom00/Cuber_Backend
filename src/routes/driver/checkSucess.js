const checkSuccess = require("./controller/checkSucess");

const router = require("express").Router();

router.route("/:id").get(checkSuccess);

module.exports = router;
