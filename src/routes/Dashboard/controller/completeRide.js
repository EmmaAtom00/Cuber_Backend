const { driver, passenger } = require("../../../models/ride");
const { passengerHistory } = require("../../../models/history");
const inbox = require("../../../models/inbox");

const completeRide = async (req, res) => {
  try {
    const passengerEmail = req.user.email;

    // Get passenger details
    const passengerRideDetails = await passenger.findOne({
      email: passengerEmail,
    });
    if (!passengerRideDetails) {
      return res.status(404).json({ message: "Passenger ride not found" });
    }

    if (!passengerRideDetails.success) {
      // Update passenger success status to true
      await passenger.findOneAndUpdate(
        { email: passengerEmail },
        { success: true },
        { new: true, runValidators: true }
      );

      // Update driver's passenger list
      const driverRide = await driver.findOne({
        email: passengerRideDetails.driver,
      });
      if (!driverRide) {
        return res.status(404).json({ message: "Driver not found" });
      }

      const updatedPassengers = driverRide.passengers.map((p) =>
        p.email === passengerEmail ? { ...p, success: true } : p
      );

      await driver.findOneAndUpdate(
        { email: passengerRideDetails.driver },
        { passengers: updatedPassengers }
      );

      // Move ride details to history
      const rideHistory = {
        _id: passengerRideDetails._id,
        email: passengerRideDetails.email,
        location: passengerRideDetails.location,
        destination: passengerRideDetails.destination,
        pickup: passengerRideDetails.pickup,
        driver: passengerRideDetails.driver,
        success: true,
      };

      const history = await passengerHistory.create(rideHistory);
      if (history) {
        await passenger.findOneAndDelete({ email: passengerEmail });
        await inbox.findOneAndDelete({ email: passengerEmail });

        // console.log("All requests and ride have been removed");
      }

      return res.status(200).json({ message: "Ride completed successfully" });
    } else {
      return res.status(203).json({ message: "Ride already completed" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = completeRide;
