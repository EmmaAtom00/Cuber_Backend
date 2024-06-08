const { Router } = require("express");
const routesProtected = require("./controller/routesProtected");
const router = Router();

router.route("/").get(routesProtected);

module.exports = router;
