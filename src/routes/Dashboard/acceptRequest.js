const { Router } = require("express");
const acceptRequest = require("./controller/acceptRequest");
const router = Router();

router.route("/:id/:email").get(acceptRequest);

module.exports = router;
