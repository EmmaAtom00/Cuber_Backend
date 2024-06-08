const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../../models/user"); // Adjust the path as necessary
require("dotenv").config();

const router = express.Router();

router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, msg: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    const user = await User.findOne({ email: decoded.email });

    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(403)
        .json({ success: false, msg: "Invalid refresh token" });
    }

    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "15m",
    });
    const newRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: "7d",
    });

    user.refreshToken = newRefreshToken;
    await user.save();

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error" });
  }
});

module.exports = router;
