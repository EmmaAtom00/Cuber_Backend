const { driverHistory } = require("../../../models/history");
const inbox = require("../../../models/inbox");
const notification = require("../../../models/notification ");
const { driver } = require("../../../models/ride");

const endRide = async (req, res) => {
  try {
    const driverId = req.user.email;

    const ride = await driver.findOne({ email: driverId });

    if (!ride) {
      return res
        .status(404)
        .json({ message: "Ride not found for this driver" });
    }

    // Update the driver ride to be successful
    const updateRide = await driver.findOneAndUpdate(
      { email: driverId },
      { success: true },
      { new: false, runValidators: true }
    );

    if (updateRide) {
      // Notify the driver about the end of the ride
      await notification.create({
        email: driverId,
        message: "You just ended your ride. Check history for details.",
      });

      // Notify all passengers that the driver has ended the ride
      const passengerNotifications = ride.passengers.map((passenger) => ({
        email: passenger.email,
        message: `Driver ${driverId} has ended the trip.`,
      }));
      await notification.insertMany(passengerNotifications);

      // Add the ride to history before deleting it
      const rideHistory = {
        _id: ride._id,
        email: driverId,
        location: ride.location,
        passengers: ride.passengers,
        success: true,
      };

      const historyCreated = await driverHistory.create(rideHistory);
      if (historyCreated) {
        // Delete the ride from available drivers
        await driver.findOneAndDelete({ email: driverId });

        // Notify passengers with pending requests
        const pendingRequests = await inbox.find({ driverEmail: driverId });
        if (pendingRequests.length > 0) {
          const requestNotifications = pendingRequests.map((request) => ({
            email: request.email,
            message:
              "Your request has been deleted because the driver ended the ride.",
          }));
          await notification.insertMany(requestNotifications);
        }

        // Delete the requests from inbox
        await inbox.deleteMany({ driverEmail: driverId });
      }
    }

    return res.status(200).json({ message: "Ride has ended successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = endRide;
