const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = require("../../../models/user");
const protect = (req, res) => {
  const authHeader = req.headers["authorization"];
  const verify = jwt.verify(
    authHeader,
    process.env.accessTokenKey,
    async (err, decode) => {
      if (err) {
        return res.status(401).json({ success: false, msg: "Access denied" });
      }
      req.user = decode;
      const confirm = user.findOne({
        email: { $regex: new RegExp(`^${req.user.email}$`, "i") },
      });
      if (!confirm)
        return res.status(401).json({ success: false, msg: "Access denied" });
    }
  );
  return res.status(200).json({ msg: "access granted" });
};

module.exports = protect;
