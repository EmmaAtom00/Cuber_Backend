const user = require("../../../models/user");

const findMode = async (req, res) => {
  try {
    const dbUser = await user.findOne({ email: req.user.email });

    if (!dbUser) return res.status(404).json({ msg: "User not found" });

    return res.status(200).json({ driver: dbUser.driver });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = findMode;
