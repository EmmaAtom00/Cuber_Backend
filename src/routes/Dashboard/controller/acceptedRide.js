const { passenger, driver } = require("../../../models/ride");

const acceptedRide = async (req, res) => {
  try {
    const email = req.user.email;

    const findPassenger = await passenger.findOne({ email });
    if (!findPassenger) {
      return res.status(404).json({ message: "Passenger ride not found" });
    }

    if (findPassenger.driver && !findPassenger.success) {
      const Driver = await driver.findOne({ email: findPassenger.driver });
      if (Driver) {
        const driverName = `${Driver.firstName} ${Driver.lastName}`;
        return res.status(200).json({
          message: `Your ride has been accepted by ${driverName}`,
          redirect: true,
        });
      }
    }

    return res
      .status(200)
      .json({ message: "Ride not accepted yet", accepted: false });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = acceptedRide;
