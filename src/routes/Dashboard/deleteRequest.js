const { Router } = require("express");
const deleteRequest = require("./controller/deleteRequest");
const router = Router();

router.route("/:id").delete(deleteRequest);

module.exports = router;
