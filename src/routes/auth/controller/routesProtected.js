const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../../../models/user");

const routesProtected = async (req, res) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ success: false, msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(authHeader, process.env.ACCESS_TOKEN_KEY);

    req.user = decoded;

    const user = await User.findOne({
      email: { $regex: new RegExp(`^${req.user.email}$`, "i") },
    });

    if (!user) {
      return res.status(401).json({ success: false, msg: "Access denied" });
    }

    return res.status(200).json({ msg: "Access granted" });
  } catch (error) {
    return res.status(401).json({ success: false, msg: "Access denied" });
  }
};

module.exports = routesProtected;
