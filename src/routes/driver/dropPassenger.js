const dropPassenger = require("./controller/dropPassenger");

const router = require("express").Router();

router.route("/:id").get(dropPassenger);

module.exports = router;
