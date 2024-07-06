const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

const authorize = async (req, res, next) => {
  const accessToken = req.headers["authorization"];

  if (!accessToken) {
    return res.status(401).json({ msg: "No access token provided" });
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_KEY,
      (err, decode) => {
        if (decode) req.user = decode;
      }
    );

    const user = await User.findOne({
      //the regex allows for authentication with characters either uppercase or lowercase
      email: { $regex: new RegExp(`^${req.user.email}$`, "i") },
    });

    if (!user) {
      return res.status(401).json({ msg: "Invalid details" });
    }

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Session Timeout" });
    }
    return res.status(401).json({ msg: "Please login" });
  }
};

module.exports = authorize;
