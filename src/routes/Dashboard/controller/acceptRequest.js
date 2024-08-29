const { driver, passenger } = require("../../../models/ride");
const inbox = require("../../../models/inbox");
const user = require("../../../models/user");
const notification = require("../../../models/notification ");
const { passengerHistory } = require("../../../models/history");

const acceptRequest = async (req, res) => {
  try {
    const driverEmail = req.user.email;

    const driverRide = await driver.findOne({ email: driverEmail });
    if (!driverRide) {
      return res.status(404).json({ message: "No active ride" });
    }

    const { id, email } = req.params;

    if (!id) {
      return res.status(400).json({ message: "No request with this ID found" });
    }

    const findUser = await user.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "Passenger does not exist" });
    }

    if (driverRide.space === 0) {
      return res.status(400).json({ message: "Not enough space" });
    }

    const passengerRide = await passenger.findOne({ email });
    if (!passengerRide) {
      await inbox.findByIdAndDelete(id);
      return res.status(404).json({ message: "This ride does not exist" });
    }

    const passengerAlreadyAccepted = driverRide.passengers.some(
      (p) => p.email === email
    );
    if (passengerAlreadyAccepted) {
      await inbox.findByIdAndDelete(id);
      return res.status(400).json({
        message: "You have already accepted a request from this passenger",
      });
    }

    const toAddPassenger = { email, _id: passengerRide._id };

    const updatedDriverRide = await driver.findOneAndUpdate(
      { email: driverEmail },
      {
        $push: { passengers: toAddPassenger },
        $inc: { space: -1 },
      },
      { runValidators: true, new: true }
    );

    const addDriverToPassenger = await passenger.findOneAndUpdate(
      { email },
      { driver: driverEmail },
      { new: true, runValidators: true }
    );

    if (!addDriverToPassenger) {
      return res
        .status(403)
        .json({ message: "Could not add driver to passenger" });
    }

    await notification.create({
      email: findUser.email,
      message: `${findUser.firstName}, your request for the trip ${passengerRide.pickup} - ${passengerRide.destination} has been accepted. Check your ride for more details.`,
    });

    if (updatedDriverRide) {
      await inbox.findByIdAndDelete(id);
      return res.status(200).json({ message: "Success" });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to accept passenger request" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = acceptRequest;
