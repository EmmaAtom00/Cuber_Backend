const user = require("../../../models/user");
const argon = require("argon2");
const jwt = require("jsonwebtoken");

const refreshToken = async (req, res) => {
  const email = req.user.email;
  const token = req.token.refreshToken;
  const emailFound = await user.findOne({ email: email });
  if (!emailFound) return res.status(404).json({ msg: "user not found" });
  const verify = await argon.verify(token, emailFound.refreshToken);
  if (!verify) return res.status(403).json({ msg: "expired token" });
  jwt.verify(token, process.env.accessTokenKey, (err, decode) => {
    if (err) return res.status(401).json({ msg: err });
    const accessToken = jwt.sign(
      {
        email: decode.email,
        firstName: decode.firstName,
        lastName: decode.lastName,
      },
      process.env.accessTokenKey,
      { expiresIn: "30m" }
    );

    return res.status(200).json({ token: accessToken });
  });
};

module.exports = refreshToken;
