const { driver } = require("../../../models/ride");
const user = require("../../../models/user");

const rideDetails = async (req, res) => {
  try {
    const email = req.user.email;

    const findDriver = await user.findOne({ email: email });

    if (!findDriver) return res.status(404).json({ msg: "User not found" });

    const findRide = await driver.findOne({ email: email });

    if (!findRide)
      return res.status(404).json({ msg: "You do not have an active ride" });

    return res.status(200).json({ findRide });
  } catch {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = rideDetails;
