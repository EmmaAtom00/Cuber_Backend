const { driver } = require("../../../models/ride");

const startRide = async (req, res) => {
  try {
    const driverEmail = req.user.email;
    const ride = await driver.findOne({ email: driverEmail });

    if (!ride) {
      return res.status(404).json({ message: "Driver not found" });
    }

    if (!ride.available) {
      return res.status(400).json({ message: "Ride is already in progress" });
    }

    await driver.findOneAndUpdate(
      { email: driverEmail },
      { available: false },
      { new: true, runValidators: true }
    );

    return res.status(200).json({ message: "Ride has started" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = startRide;
