const { driver } = require("../../../models/ride");

const started = async (req, res) => {
  try {
    const email = req.user.email;

    const driverData = await driver.findOne({ email });
    if (!driverData) {
      return res.status(404).json({ message: "Driver not found" });
    }

    return res.status(200).json({ available: driverData.available });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = started;
