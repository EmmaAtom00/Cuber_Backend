const user = require("../../../models/user");

const approve = async (req, res) => {
  const email = req.user.email;
  const dbUser = await user.findOne({ email: email });

  if (!dbUser) return res.status(404).json({ msg: "user not found" });
  return res.status(200).json({ approved: dbUser.approved });
};

module.exports = approve;
