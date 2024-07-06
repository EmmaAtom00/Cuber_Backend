const { Router } = require("express");
const deleteNotification = require("./controls/deleteNotification");
const router = Router();

router.route("/:id").delete(deleteNotification);

module.exports = router;
