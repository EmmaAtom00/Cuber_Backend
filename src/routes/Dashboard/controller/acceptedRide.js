const { passenger, driver } = require("../../../models/ride");

const acceptedRide = async (req, res) => {
  try {
    const email = req.user.email;

    const findPassenger = await passenger.findOne({ email: email });

    if (!findPassenger)
      return res.status(404).json({ msg: "Passenger ride not found" });

    if (findPassenger.driver) {
      const Driver = await driver.findOne({ email: findPassenger.driver });
      const driverName = Driver.firstName + " " + Driver.lastName;
      return res.status(200).json({
        msg: `Your ride has been accepted by ${driverName}`,
        redirect: true,
      });
    }

    return res.status(404).json({ msg: "Ride not accepted yet" });
  } catch (error) {
    return res.status(500).json({ msg: "something went wrong" });
  }
};

module.exports = acceptedRide;
