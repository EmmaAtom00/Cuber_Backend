const user = require("../../../models/user");

const findMode = async (req, res) => {
  const dbUser = await user.findOne({ email: req.user.email });
  if (!dbUser) return res.status(404).json({ msg: "User not found" });
  return res.status(200).json({ driver: dbUser.driver });
};

module.exports = findMode;
