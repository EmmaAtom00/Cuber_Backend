const { driver, passenger } = require("../../../models/ride");
const inbox = require("../../../models/inbox");
const user = require("../../../models/user");
const notification = require("../../../models/notification ");

const acceptRequest = async (req, res) => {
  try {
    const driverEmail = req.user.email;

    const { id, email } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "No request with this id found" });
    }

    const findUser = await user.findOne({ email: email });

    if (!findUser) {
      return res.status(404).json({ msg: "Passenger does not exist" });
    }

    const findRide = await driver.findOne({ email: driverEmail });

    if (!findRide) {
      return res.status(404).json({ msg: "Driver doesn't have a ride" });
    }

    const passengers = { passengers: [...findRide.passengers, email] };

    const addPassenger = await driver.findOneAndUpdate(
      { email: driverEmail },
      passengers,
      { runValidators: true, new: false }
    );

    const addDriverToPassenger = await passenger.findOneAndUpdate(
      { email: email },
      { driver: driverEmail },
      { new: false, runValidators: true }
    );

    if (!addDriverToPassenger)
      return res.status(403).json({ msg: "could not add driver to passenger" });

    const details = await passenger.findOne({ email: email });

    await notification.create({
      email: details.email,
      message: `${details.firstName}, your request for the trip ${details.pickup} - ${details.destination} has been accepted, check your ride for more details.`,
    });

    if (addPassenger) {
      await inbox.findByIdAndDelete(id);

      return res.status(200).json({ msg: "Success" });
    } else {
      return res
        .status(500)
        .json({ msg: "Failed to accept passenger request" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = acceptRequest;
