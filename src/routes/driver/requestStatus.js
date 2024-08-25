const RequestStatus = require("./controller/requestStatus");

const router = require("express").Router();

router.route("/:id").get(RequestStatus);

module.exports = router;
