const User = require("../../../models/user");

const logoutController = async (req, res) => {
  try {
    const { email } = req.user;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    await User.findOneAndUpdate(
      { email },
      { refreshToken: null },
      { new: true, runValidators: true }
    );

    // res.clearCookie("token", {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    // });

    return res.status(200).json({ success: true, msg: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error" });
  }
};

module.exports = logoutController;
