const user = require("../../../models/user");

const logoutController = async (req, res) => {
  const { email } = req.user;
  const User = await user.findOne({ email: email });
  const newRefreshToken = null;
  const updateRefreshToken = await user.findOneAndUpdate(
    { refreshToken: User.refreshToken },
    newRefreshToken,
    { new: false, runValidators: true }
  );
  res.clearCookie();
  return res.status(200).json({ success: true, msg: "Logout successful" });
};

module.exports = logoutController;
