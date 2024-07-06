const { Router } = require("express");
const sendRequest = require("./controller/sendRequest");
const router = Router();

router.route("/:id").get(sendRequest);

module.exports = router;
