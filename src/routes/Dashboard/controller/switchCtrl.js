const { driver, passenger } = require("../../../models/ride");
const user = require("../../../models/user");

const switchMode = async (req, res) => {
  try {
    // console.log(req.user.email);
    const find = await user.findOne({ email: req.user.email });

    if (!find) return res.status(404).json({ msg: "User not found" });

    const existingDrive = await driver.findOne({ email: req.user.email });
    const existingRide = await passenger.findOne({ email: req.user.email });

    // console.log(existingDrive, existingRide);

    if (!(existingDrive || existingRide)) {
      const change = await user.findOneAndUpdate(
        { email: find.email },
        { driver: !find.driver },
        { new: false, runValidators: true }
      );

      const mode = await user.findOne({ email: find.email });

      if (!mode.driver)
        return res.status(200).json({ msg: "Changed to passenger" });

      return res.status(200).json({ msg: "Changed to driver" });
    } else {
      return res
        .status(400)
        .json({ msg: "You cannot change while having an active ride" });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = switchMode;
