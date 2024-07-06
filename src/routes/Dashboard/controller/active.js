const { passenger } = require("../../../models/ride");
const user = require("../../../models/user");

const active = async (req, res) => {
  try {
    const email = req.user.email;

    const findUser = await user.findOne({ email: email });

    if (!findUser) return res.status(404).json({ msg: "user not found" });

    const activeRide = await passenger.findOne({ email: email });

    if (!activeRide)
      return res.status(404).json({ msg: "no active ride found" });
    if (!activeRide.success) return res.status(200).json({ activeRide });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "something went wrong" });
  }
};

module.exports = active;
