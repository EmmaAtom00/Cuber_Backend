const jwt = require("jsonwebtoken");
require("dotenv").config();
const argon = require("argon2");
const User = require("../../../models/user");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "failed", msg: "Details are incomplete" });
  }

  try {
    const foundUser = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!foundUser) {
      return res.status(404).json({ status: "failed", msg: "User not found" });
    }

    const passwordMatch = await argon.verify(foundUser.password, password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ status: "failed", msg: "Incorrect details" });
    }

    const payload = {
      email: foundUser.email,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "1d",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: "7d",
    });

    await User.findByIdAndUpdate(
      foundUser._id,
      { refreshToken },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      status: "success",
      msg: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ status: "failed", msg: "Internal server error" });
  }
};

module.exports = loginController;
