const user = require("../../../models/user");

const switchMode = async (req, res) => {
  const find = await user.findOne({ email: req.user.email });
  if (!find) return res.status(404).json({ msg: "User not found" });
  const change = await user.findOneAndUpdate(
    { email: find.email },
    { driver: !find.driver },
    { new: false, runValidators: true }
  );
  const mode = await user.findOne({ email: find.email });
  if (!mode.driver)
    return res.status(200).json({ msg: "Changed to passenger" });
  return res.status(200).json({ msg: "Changed to driver" });
};

module.exports = switchMode;
