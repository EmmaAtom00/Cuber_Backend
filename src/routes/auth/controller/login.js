const jwt = require("jsonwebtoken");
require("dotenv").config();
const argon = require("argon2");
const user = require("../../../models/user");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password))
    return res
      .status(401)
      .json({ status: "failed", msg: "details are incomplete" });
  const found = await user.findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") },
  });
  if (!found)
    return res.status(404).json({ status: "failed", msg: "user not found" });
  const match = await argon.verify(found.password, password);
  if (!match)
    return res.status(401).json({ status: "failed", msg: "incorrect details" });
  const accessToken = jwt.sign(
    {
      email: found.email,
      firstName: found.firstName,
      lastName: found.lastName,
    },
    process.env.accessTokenKey,
    { expiresIn: "1d" }
  );

  const refreshToken = jwt.sign(
    {
      email: found.email,
      firstName: found.firstName,
      lastName: found.lastName,
    },
    process.env.accessTokenKey,
    { expiresIn: "1d" }
  );

  const updateRefreshToken = await user.findOneAndUpdate(
    { refreshToken: found.refreshToken },
    refreshToken,
    { new: false, runValidators: true }
  );

  return res
    .status(200)
    .json({ status: "success", msg: "login successful", token: accessToken });
};

module.exports = loginController;
