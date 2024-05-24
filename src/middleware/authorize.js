const jwt = require("jsonwebtoken");
require("dotenv").config();
const argon = require("argon2");
const user = require("../models/user");

const authorize = async (req, res, next) => {
  const accessToken = req.headers["authorization"];

  if (!accessToken)
    return res.status(401).json({ msg: "No access token", token: accessToken });

  const verify = jwt.verify(
    accessToken,
    process.env.accessTokenKey,
    async (err, decode) => {
      if (err) return res.status(401).json({ msg: "Expired token" });
      else {
        req.user = decode;
        const find = await user.findOne({
          email: { $regex: new RegExp(`^${req.user.email}$`, "i") },
        });
        if (!find) {
          return res.status(401).json({ msg: "User not found" });
        }
        next();
      }
    }
  );
};

module.exports = authorize;
