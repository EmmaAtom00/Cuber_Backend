const { driverHistory } = require("../../../models/history");
const inbox = require("../../../models/inbox");
const notification = require("../../../models/notification ");
const { driver } = require("../../../models/ride");

const endRide = async (req, res) => {
  try {
    const driverId = req.user.email;

    const ride = await driver.findOne({ email: driverId });

    const findRideAndEnd = await driver.findOneAndUpdate(
      { email: driverId },
      { success: true },
      { new: false, runValidators: true }
    );
    if (findRideAndEnd) {
      const notify = await notification.create({
        email: driverId,
        message: "You just ended your ride, check history for details",
      });
      for (let i in ride.passengers) {
        console.log(i);
        const notifyPassenger = await notification.create({
          email: i,
          message: `Driver ${driverId} has ended his trip`,
        });
      }
      const rideHistory = {
        email: driverId,
        location: {
          lat: ride.location.lat,
          lng: ride.location.lng,
        },

        passengers: ride.passengers,
        success: true,
      };
      const hist = await driverHistory.create(rideHistory);
      if (hist) {
        const deleteRide = await driver.findOneAndDelete({ email: driverId });
        const requests = await inbox.find({ driverEmail: driverId });
        if (requests) {
          for (let i in requests) {
            console.log(i);
            const notifyPass = await notification.create({
              email: i.email,
              message:
                "Your request has been deleted because the driver ended the ride",
            });
          }
        }
        const deleteRequest = await inbox.findOneAndDelete({
          driverEmail: driverId,
        });
      }
    }
    return res.status(200).json({ msg: "Ride has ended successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = endRide;
