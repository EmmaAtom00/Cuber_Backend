const user = require("../../../models/user");

const dashboardController = async (req, res) => {
  try {
    const User = req.user;

    const find = await user.findOne({
      email: { $regex: new RegExp(`^${User.email}$`, "i") },
    });

    if (!find)
      return res.status(401).json({ success: false, msg: "Access denied" });

    return res.status(200).json({ data: User });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = dashboardController;
