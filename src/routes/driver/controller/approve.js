const user = require("../../../models/user");

const approve = async (req, res) => {
  try {
    const email = req.user.email;

    const dbUser = await user.findOne({ email: email });

    if (!dbUser) return res.status(404).json({ msg: "user not found" });

    return res
      .status(200)
      .json({ approved: dbUser.approved, car_type: dbUser.car_type });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Something went wrong" });
  }
};

module.exports = approve;
